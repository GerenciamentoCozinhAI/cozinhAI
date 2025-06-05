import { supabase } from "../database/supabase";
import { prisma } from "../database/prisma";

export async function registerUser({ email, password, name, avatar_url }: { email: string, password: string, name: string, avatar_url?: string }) {
  if (!email || !password || !name) {
    throw new Error("Missing required fields: email, password, and name");
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        avatar_url,
      },
    },
  });

  if (signUpError || !signUpData.user) {
    throw new Error(signUpError?.message || "Failed to sign up");
  }

  const user = signUpData.user;

  try {
    await prisma.user.create({
      data: {
        id: user.id,
        name,
        email,
        avatar: avatar_url,
      },
    });
  } catch (prismaError) {
    await supabase.auth.admin.deleteUser(user.id);
    throw new Error("Failed to save user to database");
  }

  return user;
}

export async function loginUser({ email, password }: { email: string, password: string }) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error(error?.message || "Invalid email or password");
  }

  return { user: data.user, session: data.session };
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Failed to log out");
  }
}

export async function syncGoogleUser({ id, email, full_name, avatar_url }: { id: string, email: string, full_name?: string, avatar_url?: string }) {
  if (!id || !email) {
    throw new Error("Dados do usuário incompletos.");
  }

  let user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id,
        email,
        name: full_name || "Usuário",
        avatar: avatar_url || null,
      },
    });
  }

  return user;
}