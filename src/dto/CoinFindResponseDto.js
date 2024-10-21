// CoinFindResponseDto.js
class CoinFindResponseDto {
    constructor(coinId, memberId, coinDateTime, coinAmount, coinReason, coinForeignId) {
        this.coinId = coinId;
        this.memberId = memberId;
        this.coinDateTime = coinDateTime;
        this.coinAmount = coinAmount;
        this.coinReason = coinReason;
        this.coinForeignId = coinForeignId;
    }
}

// DTO를 반환하는 함수
export const createCoinFindResponseDto = (data) => {
    return new CoinFindResponseDto(
        data.coinId,
        data.memberId,
        data.coinDateTime,
        data.coinAmount,
        data.coinReason,
        data.coinForeignId
    );
};

export default CoinFindResponseDto;