import { useState, Dispatch, SetStateAction } from "react";
import { replaceMyUser } from "../../../services/userService";
import { useToast } from "../../../contexts/ToastContext";
import Modal from "../../ui/Modal";

export interface User {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    createdAt: string;
    recipeCount: number;
    favoriteCount: number;
}

interface UserFormProps {
    user: User;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserForm = (userProps: UserFormProps) => {
    const { user, setUser } = userProps;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleReplaceMyUser = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token não encontrado");
                showToast("Token não encontrado", "error");
                return;
            }
            await replaceMyUser(user);
            showToast("Conta atualizada com sucesso!", "success");
        } catch (error) {
            setError("Erro ao atualizar conta");
            showToast("Erro ao atualizar conta", "error");
            console.error("Erro ao atualizar conta:", error);
        } finally {
            setLoading(false);
            setShowConfirm(false);
        }
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setShowConfirm(true);
                }}
                className="bg-gray-50 p-4 rounded-lg"
            >
                <h4 className="font-medium mb-3">Informações Pessoais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Nome Completo</label>
                        <input
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e9f3d] focus:border-transparent"
                            value={user.name || ""}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e9f3d] focus:border-transparent"
                            value={user.email || ""}
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Telefone</label>
                        <input
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e9f3d] focus:border-transparent"
                            value={user.phone || ""}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">avatar URL</label>
                        <input
                            onChange={(e) => setUser({ ...user, avatar: e.target.value })}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e9f3d] focus:border-transparent"
                            value={user.avatar || ""}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-[#4e9f3d] text-white px-4 py-2 rounded-md hover:bg-[#1e5128] transition-colors"
                    disabled={loading}
                >
                    {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <Modal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                title="Confirmar alteração"
            >
                <p>Tem certeza que deseja alterar seus dados?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={() => setShowConfirm(false)}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleReplaceMyUser}
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                        disabled={loading}
                    >
                        {loading ? "Salvando..." : "Confirmar"}
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default UserForm;