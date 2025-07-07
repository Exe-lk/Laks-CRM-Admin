import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // First, check if the locum profile exists and get its status
    const locumProfile = await prisma.locumProfile.findUnique({
      where: { emailAddress: email },
      include: {
        specialties: true,
      },
    });

    if (!locumProfile) {
      return res.status(404).json({
        error: "Profile not found",
      });
    }

    // Check profile status
    switch (locumProfile.status) {
      case "delete":
        return res.status(403).json({
          error: "Profile has been deleted by admin",
          status: "deleted",
        });

      case "pending":
        return res.status(403).json({
          error: "Still not approved",
          status: "pending",
        });

      case "accept":
        // Proceed with authentication
        break;

      default:
        return res.status(403).json({
          error: "Profile status is invalid",
          status: "unknown",
        });
    }

    // Authenticate with Supabase
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (signInError) {
      return res.status(401).json({
        error: `Authentication failed: ${signInError.message}`,
      });
    }

    // Return successful login response with tokens and profile data
    return res.status(200).json({
      message: "Login successful",
      profile: locumProfile,
      accessToken: signInData.session?.access_token,
      refreshToken: signInData.session?.refresh_token,
      session: {
        access_token: signInData.session?.access_token,
        refresh_token: signInData.session?.refresh_token,
        expires_at: signInData.session?.expires_at,
        token_type: signInData.session?.token_type,
        user: signInData.user,
      },
    });
  } catch (error: any) {
    console.error("Login API Error:", error);

    // Handle Prisma-specific errors
    if (error.code === "P1001") {
      return res.status(500).json({
        error: `Database connection error: ${
          error.message || "Unable to connect to database"
        }`,
      });
    }

    // Handle Supabase auth errors
    if (error.message && error.message.includes("supabase")) {
      return res.status(500).json({
        error: `Supabase error: ${error.message}`,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
