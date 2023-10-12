import React, { useState } from "react";

function HomePageTest() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 假设初始状态为未登录

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 左侧边栏 */}
      <div className="w-1/5 bg-white p-4">
        <div className="mb-6">
          <img
            src="path_to_company_logo"
            alt="Company Logo"
            className="w-24 h-24"
          />
          <h1 className="text-2xl font-bold">Company Name</h1>
        </div>
        <ul className="space-y-4">
          <li>Warnings</li>
          <li>Health tips</li>
          <li>Collection</li>
          <li>Setting</li>
        </ul>
        <div className="mt-6">
          <div>Help Centre</div>
          <div>Contact us</div>
          <div>Log out</div>
        </div>
      </div>
      {/* 主体部分 */}
      <div className="w-4/5 flex flex-col items-center justify-between p-4">
        {/* 登陆状态 */}
        <div className="self-end">
          {isLoggedIn ? (
            <div className="flex items-center">
              <img
                src="path_to_user_avatar"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
              <span className="ml-4">Username</span>
            </div>
          ) : (
            <div>
              <button className="text-blue-500">登录</button>/
              <button className="text-blue-500">注册</button>
            </div>
          )}
        </div>
        {/* 地图部分 */}
        <div className="relative w-full h-4/5 mt-8">
          <div className="absolute top-0 right-0 m-4">
            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded border"
            />
          </div>
          {/* 地图组件 */}
          <div className="w-full h-full bg-gray-300 rounded">
            {/* 这里可以放你的地图组件 */}
          </div>
          {/* 悬浮的病例趋势和诊断数量 */}
          <div className="absolute top-1/4 left-1/4 bg-white p-4 rounded shadow-lg">
            Cases Trend
            {/* 你的病例趋势组件 */}
          </div>
          <div className="absolute top-1/2 right-1/4 bg-white p-4 rounded shadow-lg">
            Diagnosis Count
            {/* 你的诊断数量组件 */}
          </div>
        </div>
        {/* 对话机器人 */}
        <div className="w-full p-4 mt-8 bg-white rounded shadow-lg">
          Ask me
          {/* 你的对话机器人组件 */}
        </div>
      </div>
    </div>
  );
}

export default HomePageTest;
