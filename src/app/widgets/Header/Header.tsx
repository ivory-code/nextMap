'use client'

import {useState} from 'react'

const categories = [
  {icon: '🏡', label: '한적한 시골'},
  {icon: '⭐', label: '컬쳐 아이콘'},
  {icon: '🖼', label: '최고의 전망'},
  {icon: '🏯', label: '한옥'},
  {icon: '🌊', label: '호수 근처'},
  {icon: '❄️', label: '북극'},
  {icon: '🏖', label: '멋진 수'},
]

const Header = () => {
  const [activeCategory, setActiveCategory] = useState('한적한 시골')

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {/* 검색 바 */}
      <div className="flex justify-center items-center px-4 py-3 h-20">
        <div className="relative w-full max-w-xl">
          <button className="w-full h-14 text-center text-gray-700 border rounded-full shadow-lg" />
        </div>
      </div>

      {/* 카테고리 메뉴 (가운데 정렬 문제 해결) */}
      <nav className="w-full bg-white shadow-md h-16 flex justify-center">
        <div className="overflow-x-auto">
          <ul className="inline-flex gap-6 px-6 py-2 whitespace-nowrap">
            {categories.map(category => (
              <li
                key={category.label}
                onClick={() => setActiveCategory(category.label)}
                className={`flex flex-col items-center cursor-pointer text-gray-500 hover:text-black transition ${
                  activeCategory === category.label
                    ? 'text-black font-bold'
                    : ''
                }`}>
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm">{category.label}</span>
                {activeCategory === category.label && (
                  <div className="w-full h-1 bg-black mt-1 rounded-full"></div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
