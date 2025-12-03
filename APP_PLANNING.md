# KAIROS App 기획 문서 (v2)

## 핵심 컨셉

**데모 중심 개발** - 목데이터 기반으로 사용자 경험 데모 구현

---

## 페이지 구조

```
/app                    → /app/positions으로 리다이렉트
/app/positions          → My Positions (내 포지션 관리)
/app/explore            → Explore Positions (포지션 탐색 & 복사)
/app/vaults             → Protocol Vaults (프로토콜 볼트)
/app/analytics          → (보류)
```

---

## 1. Explore Positions (`/app/explore`)

### 목적
- 성공적인 LP 포지션을 발견하고 복사(민팅)할 수 있는 허브
- "이 포지션이 이 풀을 활용해서 이렇게 수익을 창출하고 있다" 시각화

### UI 구성

#### 1.1 포지션 카드 그리드
각 포지션 카드에 표시할 정보:
- **DEX/Chain**: Uniswap V3 / Arbitrum
- **Pool**: ETH/USDC (0.3% fee tier)
- **Initial Portfolio**: $5,000 (2.5 ETH + 2,500 USDC)
- **Current Balance**: $6,250 (2.1 ETH + 3,100 USDC)
- **ROI**: +25% (+$1,250)
- **APY**: 65.4%
- **Duration**: 45일
- **IL Insurance**: 활성화됨 / 비활성화

#### 1.2 필터
- Chain: All / Ethereum / Arbitrum / Base / HyperEVM...
- DEX: All / Uniswap V3 / Aerodrome / PancakeSwap...
- Pool: ETH/USDC, BTC/USDC, HYPE/USDC...
- Sort: ROI / APY / TVL / Duration

#### 1.3 포지션 클릭 → 민팅 모달

### Position Mint Modal (Ramses 스타일 참고)

**왼쪽: 포지션 정보**
- 원본 포지션 상세
- Price Range 시각화 (현재가 대비 범위)
- 퍼포먼스 히스토리

**오른쪽: 민팅 폼**
```
┌─────────────────────────────────────┐
│  Select Chain                       │
│  [Arbitrum ▼]                       │
│                                     │
│  Bridge Required: Yes (from ETH)    │
│  [Bridge & Mint] or [Mint Direct]   │
├─────────────────────────────────────┤
│  Deposit Amount                     │
│  ┌─────────────────────────────┐    │
│  │ ETH        │    2.5    │ ▼ │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ USDC       │   2500    │ ▼ │    │
│  └─────────────────────────────┘    │
│  Balance: 5.2 ETH / 10,000 USDC     │
├─────────────────────────────────────┤
│  Price Range (Copy from position)   │
│  Min: $1,800  ←───●───→  Max: $2,400│
│  Current: $2,000                    │
│                                     │
│  [■] Use same range as original     │
│  [□] Custom range                   │
├─────────────────────────────────────┤
│  □ Enable IL Insurance (+0.5% fee)  │
│    Coverage: Up to 80% IL protected │
├─────────────────────────────────────┤
│  Summary                            │
│  Total Deposit: $5,000              │
│  Gas Fee: ~$2.50                    │
│  IL Insurance: $25 (if enabled)     │
│                                     │
│  [  Copy & Mint Position  ]         │
└─────────────────────────────────────┘
```

### 멀티체인 지원
- 원본 포지션과 다른 체인에서 민팅 가능
- 필요시 Bridge 자동 제안
- 지원 체인: Ethereum, Arbitrum, Base, Optimism, Polygon, HyperEVM 등

### IL Insurance 모듈
- LP 민팅 이후 선택적으로 활성화
- 프리미엄: 포지션 가치의 0.5%
- 커버리지: IL의 최대 80%

---

## 2. My Positions (`/app/positions`)

### 목적
- 내가 보유한 모든 LP 포지션 관리
- ROI, IL, 보험 상태 실시간 추적

### UI 구성

#### 2.1 Portfolio Summary
- Total Value: $35,900
- Total Fees Earned: $3,010
- Total IL Loss: -$780
- Insurance Claims: +$456
- Net Profit: +$2,686

#### 2.2 Position Cards
기존 구현 유지 + 개선:
- 포지션 클릭 → 상세 모달 (토큰 비율 변화, 히스토리)
- IL Insurance 토글
- Withdraw / Add Liquidity 버튼

---

## 3. Protocol Vaults (`/app/vaults`)

### 목적
- 프로토콜 데이터 수집을 위한 볼트 시스템
- 사용자에게는 "손쉬운 LP 전략 참여" 제공

### Vault 타입

#### 3.1 Stable Vault (안정 볼트)
**목적**: IL Insurance 헤지 포지션의 마진 제공

```
┌─────────────────────────────────────────┐
│  🛡️ Stable Vault                        │
│  Insurance Hedge Margin Pool            │
├─────────────────────────────────────────┤
│  Deposit: USDC                          │
│  TVL: $820,000                          │
│  APY: 8.5%                              │
│  Utilization: 65%                       │
├─────────────────────────────────────────┤
│  Your Deposit: $1,000 USDC              │
│  Earned: +$42.50                        │
│                                         │
│  [Deposit]  [Withdraw]                  │
└─────────────────────────────────────────┘
```

#### 3.2 LP Vaults (LP 전략 볼트)
**목적**: 데이터 기반 자동화 LP 운영

**특징**:
- 입금 캡: $100 per vault
- 자동 종료: ROI 3% 도달 시
- 빠른 반복으로 데이터 수집

```
┌─────────────────────────────────────────┐
│  📊 ETH/USDC Conservative              │
│  Low-risk blue chip strategy            │
├─────────────────────────────────────────┤
│  Cap: $100 / Vault                      │
│  Target ROI: 3% (Auto-close)            │
│  Current Progress: ████████░░ 2.4%      │
│  Estimated Time: ~3 days                │
├─────────────────────────────────────────┤
│  Strategy: Narrow range around current  │
│  Pool: ETH/USDC 0.05%                   │
│  Chain: Arbitrum                        │
├─────────────────────────────────────────┤
│  Status: 🟢 Active (45/100 slots)       │
│                                         │
│  [Join Vault - $100]                    │
└─────────────────────────────────────────┘
```

**LP Vault 예시들**:
1. **ETH/USDC Conservative** - 안정적, 좁은 범위
2. **HYPE/USDC Aggressive** - 고위험 고수익
3. **Stablecoin Yield** - 스테이블 페어, 최소 IL
4. **Multi-pool Diversified** - 여러 풀 분산

### Vault Status
- 🟢 Active: 참여 가능
- 🟡 Closing: ROI 목표 근접, 곧 종료
- 🔴 Completed: ROI 3% 달성, 종료됨

### Vault History
- 완료된 볼트 히스토리
- 각 볼트의 실제 ROI, 기간, 전략 성과

---

## 4. 데이터 모델

### Position (Explore/My Positions)
```typescript
interface ExplorePosition {
  id: string;
  chain: string;           // "arbitrum", "base", "ethereum"
  dex: string;             // "Uniswap V3", "Aerodrome"
  pool: string;            // "ETH/USDC"
  feeTier: number;         // 0.3, 0.05, 1

  initialPortfolio: {
    token0: { symbol: string; amount: number; valueUsd: number };
    token1: { symbol: string; amount: number; valueUsd: number };
    totalValueUsd: number;
    date: string;
  };

  currentBalance: {
    token0: { symbol: string; amount: number; valueUsd: number };
    token1: { symbol: string; amount: number; valueUsd: number };
    totalValueUsd: number;
  };

  priceRange: {
    min: number;
    max: number;
    current: number;
    inRange: boolean;
  };

  performance: {
    roiPercent: number;
    roiUsd: number;
    apy: number;
    feesEarned: number;
    ilLoss: number;
    insuranceClaim: number;
  };

  durationDays: number;
  isInsured: boolean;
}
```

### LP Vault
```typescript
interface LPVault {
  id: string;
  name: string;
  description: string;
  strategy: string;

  chain: string;
  pool: string;
  dex: string;

  cap: number;              // $100
  targetRoi: number;        // 3%
  currentRoi: number;       // 2.4%

  status: 'active' | 'closing' | 'completed';
  slotsTotal: number;       // 100
  slotsFilled: number;      // 45

  estimatedDays: number;
  startDate: string;
  endDate?: string;

  userDeposit?: number;
  userEarned?: number;
}
```

### Stable Vault
```typescript
interface StableVault {
  name: string;
  description: string;
  token: string;            // "USDC"
  tvl: number;
  apy: number;
  utilization: number;      // Insurance pool utilization
  userDeposit: number;
  userEarned: number;
}
```

---

## 5. 구현 순서

### Phase 1: Explore 페이지 리디자인
1. 포지션 카드 그리드 UI
2. 필터 기능
3. Position Mint 모달

### Phase 2: Vaults 페이지 리디자인
1. Stable Vault UI
2. LP Vault 카드 UI
3. Vault History

### Phase 3: Positions 페이지 개선
1. 상세 모달
2. IL Insurance 토글

---

## 6. Mock Data 구조

```
/src/data/
  mock-explore-positions.ts   # Explore용 포지션 데이터
  mock-vaults.ts              # Vault 데이터 (Stable + LP)
  mock-positions.ts           # My Positions 데이터 (기존)
```
