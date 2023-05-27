import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
const NavbarItem = ({ tittle, classProps}) => {
    return(
    <li className={'mx-4 cursor-pointer ${classProps}'}>
        {tittle}
        </li>
       
    );
}
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return(
        <nav className="w-full flex md:justify-centre justify-between items-centre p-4">
            <div className="md:flex-[0.5] flex-initial justify-centre items-centre">

            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-centre flex-initial">
                {["Market", "Buy", "Borrow", "Invest"].map((item, index) => (
                    <NavbarItem key={item + index} tittle={item} />
                ))}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {toggleMenu
                 ? <AiOutlineClose fontsize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
                 : <HiMenuAlt4 fontsize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
                }
                {toggleMenu && (
                    <ul
                    className="z-10 fixed top-0 right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                     flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
                    "
                    >
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {["Market", "Buy", "Borrow", "Invest"].map((item, index) => (
                    <NavbarItem key={item + index} tittle={item} classProps="my-2 text-lg" />
                ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
