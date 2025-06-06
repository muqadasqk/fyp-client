import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@features';
import { FaLaptop, FaMoon, FaSun } from 'react-icons/fa';
import clsx from 'clsx';

const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.ui);

    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    useEffect(() => {
        const root = document.documentElement;
        const appliedTheme = theme === 'system' ? preferred : theme;

        if (appliedTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme, preferred]);

    return (
        <Popover className="relative">
            <PopoverButton className="flex items-center gap-2 px-4 py-2">
                {theme === "system" && <><FaLaptop className="w-4 h-4" /> System</>}
                {theme === "light" && <><FaSun className="w-4 h-4" /> Light</>}
                {theme === "dark" && <><FaMoon className="w-4 h-4" /> Dark</>}
            </PopoverButton>

            <PopoverPanel className="absolute z-10 mt-2 w-40 bg-primary border border-primary rounded-md">
                <div className="flex flex-col">
                    <button
                        onClick={() => dispatch(setTheme('light'))}
                        className={clsx("flex items-center gap-2 px-4 py-2 text-left hover:bg-primary-hover", {
                            "bg-primary-hover": theme === "light"
                        })}
                    >
                        <FaSun className="w-4 h-4" />
                        Light
                    </button>
                    <button
                        onClick={() => dispatch(setTheme('dark'))}
                        className={clsx("flex items-center gap-2 px-4 py-2 text-left hover:bg-primary-hover", {
                            "bg-primary-hover": theme === "dark"
                        })}
                    >
                        <FaMoon className="w-4 h-4" />
                        Dark
                    </button>
                    <button
                        onClick={() => dispatch(setTheme('system'))}
                        className={clsx("flex items-center gap-2 px-4 py-2 text-left hover:bg-primary-hover", {
                            "bg-primary-hover": theme === "system"
                        })}
                    >
                        <FaLaptop className="w-4 h-4" />
                        System
                    </button>
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default ThemeSwitcher;
