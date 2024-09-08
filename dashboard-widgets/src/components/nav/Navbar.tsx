import { Menu } from 'lucide-react';

type NavbarProps = {
  toggleSidebar: () => void;
};

export const Navbar = ({ toggleSidebar }: NavbarProps) => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center">
          <span className="text-xl font-semibold">MyDashboard</span>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <img
              src="/api/placeholder/32/32"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
);
