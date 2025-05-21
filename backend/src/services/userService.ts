import { prisma } from "../database/prisma";

export async function getMyUser(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function replaceMyUser(userId: string, supabase: any, data: any) {
  const { email, phone, user_metadata, name, avatar } = data;

  const supabaseUpdateData: any = {};
  if (email) supabaseUpdateData.email = email;
  if (phone) supabaseUpdateData.phone = phone;
  if (user_metadata || name || avatar) {
    supabaseUpdateData.user_metadata = {
      ...(user_metadata || {}),
      ...(name && { full_name: name, name: name }),
      ...(avatar && { avatar_url: avatar, picture: avatar }),
    };
  }

  const { data: authData, error: authError } =
    await supabase.auth.admin.updateUserById(userId, supabaseUpdateData);

  if (authError) {
    throw new Error(authError.message);
  }

  const prismaUpdateData: any = {};
  if (email) prismaUpdateData.email = email;
  if (name) prismaUpdateData.name = name;
  if (avatar) prismaUpdateData.avatar = avatar;
  if (phone) prismaUpdateData.phone = phone;

  const prismaUser = await prisma.user.update({
    where: { id: userId },
    data: prismaUpdateData,
  });

  return { authUser: authData, prismaUser };
}

export async function updateMyUser(userId: string, supabase: any, data: any) {
  // Mesma lógica do replace, mas pode ser adaptada para PATCH se necessário
  return replaceMyUser(userId, supabase, data);
}

export async function deleteMyUser(userId: string, supabase: any) {
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);
  if (authError) {
    throw new Error("Failed to delete user from auth.users");
  }

  await prisma.user.delete({ where: { id: userId } });

  return { message: "User deleted successfully" };
}