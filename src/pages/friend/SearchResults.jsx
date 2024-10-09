import React, { useState } from 'react';

// 아이콘 이미지 파일 임포트
import addFriendIcon from '../../assets/images/common/icon/add-friend.png';
import expandIcon from '../../assets/images/common/icon/expand.png';

const SearchResults = ({ searchQuery, setSearchQuery }) => {
    // 예제 데이터를 사용 (나중에 백엔드 API 호출로 대체할 예정)
    const dummyResults = [
        { name: '투두리안', id: '@김혜진' },
        { name: '투두리안', id: '@고대권' },
        { name: '투두리안', id: '@김채호' },
        { name: '투두리안', id: '@서주현' },
        { name: '투두리안', id: '@황인욱' },
    ];

    // 더보기 버튼 클릭 상태 관리
    const [showMore, setShowMore] = useState(false);

    // 더보기 버튼 클릭 핸들러
    const handleShowMore = () => {
        setShowMore(!showMore);

        // TODO: 백엔드 API 호출로 추가 친구 목록 불러오기
        // fetch('API_ENDPOINT')
        //     .then(response => response.json())
        //     .then(data => {
        //         // API로부터 추가 데이터를 받아서 상태에 추가
        //         // 예: setFriendList([...friendList, ...data])
        //     })
        //     .catch(error => {
        //         console.error('Error fetching more friends:', error);
        //     });
    };

    // 검색어 리셋 핸들러
    const handleResetSearch = () => {
        setSearchQuery('');
    };

    return (
        <div className="relative w-full max-w-3xl mt-8">
            {/* N건의 결과 표시 */}
            <p className="text-left text-[20px] leading-[22px] font-['Noto_Serif_SC'] font-medium text-[#143434] mb-4 pl-4">
                {`${dummyResults.length}건의 결과`}
            </p>

            {/* 검색 결과 리스트 (테두리 안) */}
            <div className="bg-[#fff9ef] p-6 rounded-[50px] shadow-md border-[3px] border-solid border-[#a7a39d]">
                <ul className="space-y-6">
                    {dummyResults.map((result, index) => (
                        <li key={index} className="flex items-center justify-between border-b border-[#a7a39d] pb-4 last:border-b-0 px-4">
                            <div className="flex items-center space-x-4">
                                {/* 프로필 이미지는 추후 API 데이터로 대체 */}
                                <img src="your-profile-icon-path" alt="profile" className="w-12 h-12 rounded-full bg-gray-300" />
                                <div>
                                    <p className="text-lg font-semibold text-[#000000] font-['Roboto']">{result.name}</p>
                                    <p className="text-sm text-gray-500 font-['Roboto']">{result.id}</p>
                                </div>
                            </div>
                            <button className="relative bg-[#528ccb] text-white px-4 py-1 rounded-[10px] flex items-center justify-center space-x-2 hover:bg-[#417bbf] transition-colors">
                                <img src={addFriendIcon} alt="add friend" className="w-5 h-5" />
                                <span className="text-[14px] font-bold font-['Roboto']">친구 신청</span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* 더 보기 버튼 클릭 시 추가 항목 표시 */}
                {showMore && (
                    <div className="text-center text-[#000000] text-lg mt-4 font-['Noto_Serif_SC'] py-3 bg-[#fff9ef] rounded-b-[50px]">
                        {/* TODO: 나중에 백엔드에서 추가로 불러온 데이터 표시 */}
                        더보기 항목들...
                        {/* 예제 데이터로 더보기 항목 추가 시 */}
                        {/* <ul className="space-y-6">
                            {additionalResults.map((result, index) => (
                                <li key={index} className="flex items-center justify-between border-b border-[#a7a39d] pb-4 last:border-b-0 px-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={result.profileImage || 'default-image-path.png'} alt="profile" className="w-12 h-12 rounded-full bg-gray-300" />
                                        <div>
                                            <p className="text-lg font-semibold text-[#000000] font-['Roboto']">{result.name}</p>
                                            <p className="text-sm text-gray-500 font-['Roboto']">{result.id}</p>
                                        </div>
                                    </div>
                                    <button className="relative bg-[#528ccb] text-white px-4 py-1 rounded-[10px] flex items-center justify-center space-x-2 hover:bg-[#417bbf] transition-colors">
                                        <img src={addFriendIcon} alt="add friend" className="w-5 h-5" />
                                        <span className="text-[14px] font-bold font-['Roboto']">친구 신청</span>
                                    </button>
                                </li>
                            ))}
                        </ul> */}
                    </div>
                )}

                {/* 더 보기 버튼 */}
                <button
                    onClick={handleShowMore}
                    className="flex items-center justify-center text-lg mt-4 font-['Noto_Serif_SC'] w-full py-3 border-t border-[#684c23] text-[#000] transition-colors bg-[#fff9ef] hover:bg-[#f0e6d2] outline-none focus:outline-none"
                >
                    더 보기
                    <img src={expandIcon} alt="expand more" className="ml-2 w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default SearchResults;
