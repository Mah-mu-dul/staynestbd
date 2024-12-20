import { FaClipboardCheck, FaChartBar, FaBug, FaCog } from "react-icons/fa";

const AdminDashboardLanding = ({ setActiveSection }) => {
  const sections = [
    {
      label: "Approve Requests",
      section: "approve-requests",
      icon: <FaClipboardCheck />,
    },
    { label: "Reports", section: "reports", icon: <FaChartBar /> },
    { label: "Bug Reports", section: "bug-reports", icon: <FaBug /> },
    { label: "Settings", section: "settings", icon: <FaCog /> },
  ];

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {sections.map((item) => (
          <div
            key={item.section}
            className="bg-base-100 shadow-lg rounded-lg p-4 cursor-pointer hover:bg-base-200 transition-transform duration-200 transform hover:scale-105 flex items-center justify-between"
            onClick={() => handleNavigation(item.section)}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-2">{item.icon}</span>
              <h2 className="text-lg font-semibold">{item.label}</h2>
            </div>
            <span className="badge badge-accent">New</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardLanding;
