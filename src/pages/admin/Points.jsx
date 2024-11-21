import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPointPolicy, updatePointRatio } from '../../api/admin'; // API 호출 함수 가져오기
import AdminSidebar from '../../components/AdminSidebar';

const PointPolicy = () => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editedRatios, setEditedRatios] = useState({}); // 수정된 비율을 관리하는 상태

    // 정책 데이터 가져오기
    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const data = await getPointPolicy();
                setPolicies(data); // 상태에 데이터 저장
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    // 수정 중인 비율 저장
    const handleRatioChange = (todoPointId, newRatio) => {
        setEditedRatios((prev) => ({
            ...prev,
            [todoPointId]: newRatio,
        }));
    };

    // 비율 업데이트 요청
    const handleUpdate = async (todoPointId, todoPointType) => {
        const newRatio = editedRatios[todoPointId];
        if (newRatio === undefined || newRatio === '') {
            alert('비율을 입력해주세요.');
            return;
        }

        try {
            await updatePointRatio({ todoPointType, ratio: Number(newRatio) }); // 서버로 요청
            setPolicies((prev) =>
                prev.map((policy) =>
                    policy.todoPointId === todoPointId
                        ? { ...policy, currentRatio: Number(newRatio) }
                        : policy
                )
            );
            alert('비율이 성공적으로 수정되었습니다.');
        } catch (err) {
            console.error('Failed to update ratio:', err);
            alert('비율 수정에 실패했습니다.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <PageLayout>
            <AdminSidebar /> {/* 사이드바 추가 */}
            <ContentContainer>
                <Header>포인트 정책</Header>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>정책 유형</th>
                            <th>비율</th>
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policies.map((policy) => (
                            <tr key={policy.todoPointId}>
                                <td>{policy.todoPointId}</td>
                                <td>{policy.todoPointType}</td>
                                <td>
                                    <RatioInput
                                        type="number"
                                        value={
                                            editedRatios[policy.todoPointId] !== undefined
                                                ? editedRatios[policy.todoPointId]
                                                : policy.currentRatio
                                        }
                                        onChange={(e) =>
                                            handleRatioChange(policy.todoPointId, e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <UpdateButton
                                        onClick={() =>
                                            handleUpdate(policy.todoPointId, policy.todoPointType)
                                        }
                                    >
                                        수정
                                    </UpdateButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ContentContainer>
        </PageLayout>
    );
};

export default PointPolicy;

// Styled Components
const PageLayout = styled.div`
    display: flex;
    height: 100vh;
`;

const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #f9f9f9;
`;

const Header = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ddd;
        text-align: center;
        padding: 8px;
    }

    th {
        background-color: #000;
        color: white;
    }

    td {
        color: black;
    }

    tbody tr:hover {
        background-color: #f5f5f5;
    }
`;

const RatioInput = styled.input`
    width: 80px;
    padding: 5px;
    text-align: center;
    color: #fff;
`;

const UpdateButton = styled.button`
    padding: 5px 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;
