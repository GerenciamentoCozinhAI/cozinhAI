import React from "react";

const Footer: React.FC = () => (
<div className=" bottom-0  w-full bg-[#d8f3dc]">
    <footer className="text-[#1e5128] text-center">
        <p>&copy; {new Date().getFullYear()} CozinhAI. Todos os direitos reservados.</p>
    </footer>
</div>
);

export default Footer;
