import { Link } from "react-router-dom";
import React from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser, HiLibrary } from "react-icons/hi";
import { MdReportProblem } from "react-icons/md";

const AdminSidebar = () => {
  return (
    <div className='mt-8 h-screen'>
      <Sidebar aria-label="Default sidebar example" className='w-[230px] rounded-2xl'>
        <Sidebar.Items className="mt-8">
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie}>
              <Link to="/admin/dashboard" className="text-small font-semibold">
                Dashboard
              </Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiUser}>
              <Link to="/admin/users" className="text-small font-semibold">
                Users
              </Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiLibrary}>
              <Link to="/admin/kennelapproval" className="text-small font-semibold">
                Kennel Approval
              </Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiArrowSmRight}>
              <Link to="/admin/verifiedKennelOwner" className="text-small font-semibold">
                Kennel Owners
              </Link>
            </Sidebar.Item>
            <Sidebar.Item icon={MdReportProblem}>
              <Link to="/admin/postreports" className="text-small font-semibold">
                Post Reports
              </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
