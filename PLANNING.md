# Meta DEX - 웹사이트 기획안

## 1. 프로젝트 개요

### 1.1 Meta DEX란?
Meta DEX는 HyperEVM 기반의 멀티체인 DEX 애그리게이터로, 기존 DEX들이 제공하지 못했던 **LP(Liquidity Provider) 데이터 투명성**과 **IL(Impermanent Loss) 보험** 기능을 제공합니다.

### 1.2 핵심 가치 제안
- **데이터 투명성**: LP 포지션의 과거 데이터, 실제 ROI, 추정 APY 제공
- **단일 진입점**: HyperEVM 내 모든 DEX를 하나의 인터페이스에서 접근
- **IL 보험**: 가격 하락으로 인한 Impermanent Loss 방어 기능
- **신뢰성 구축**: 다른 사용자의 포지션 분석을 통한 의사결정 지원

---

## 2. 사이트맵

```
meta-dex.io
├── / (Landing Page)
├── /app (Dashboard - 메인 앱)
│   ├── /positions (내 포지션)
│   ├── /explore (탐색)
│   ├── /analytics (분석)
│   └── /vaults (볼트)
├── /docs (문서)
└── /about (소개)
```

---

## 3. 페이지별 상세 기획

### 3.1 Landing Page (`/`)

#### Hero Section
- **헤드라인**: "See Beyond the APY"
- **서브헤드라인**: "The first DEX that shows you the real story behind LP positions"
- **CTA**: "Launch App" / "Explore Positions"
- **배경**: 다이나믹한 LP 포지션 시각화 애니메이션

#### Features Section
| 기능 | 아이콘 | 설명 |
|------|--------|------|
| LP Analytics | 📊 | 과거 LP 포지션 데이터 완벽 추적 |
| Real ROI | 💰 | 추정이 아닌 실제 수익률 확인 |
| Position Explorer | 🔍 | 다른 사용자의 성공적인 전략 분석 |
| IL Insurance | 🛡️ | Impermanent Loss로부터 자산 보호 |
| Multi-DEX | 🔗 | HyperEVM의 모든 DEX를 하나로 |

#### How It Works Section
1. **Connect Wallet** - 지갑 연결
2. **Analyze Positions** - 과거/현재 포지션 분석
3. **Compare & Decide** - 다른 포지션과 비교
4. **Provide Liquidity** - 정보 기반 LP 공급
5. **Protect with Insurance** - IL 보험 적용 (선택)

#### Stats Section (실시간 데이터)
- Total Value Locked (TVL)
- Total Positions Tracked
- Average ROI
- Insurance Pool Size

#### Supported DEXs Section
- HyperEVM 내 통합된 DEX 로고들 나열

---

### 3.2 Dashboard - My Positions (`/app/positions`)

#### 헤더
- 지갑 주소 / ENS
- Total Portfolio Value
- 24h Change

#### Position Cards Grid
각 LP 포지션 카드에 표시되는 정보:

```
┌─────────────────────────────────────────────────┐
│  ETH/USDC  [HyperSwap]           🛡️ Insured    │
├─────────────────────────────────────────────────┤
│  Initial Deposit                                │
│  ├── 1.5 ETH ($3,000)                          │
│  └── 3,000 USDC                                │
│                                                 │
│  Current Position                               │
│  ├── 1.2 ETH ($2,400)                          │
│  └── 3,600 USDC                                │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ [Portfolio Composition Chart over time] │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Fees Earned: $450.32                          │
│  IL: -$120.00                                  │
│  IL Insurance Claim: +$96.00                   │
│  ─────────────────────────────────             │
│  Real ROI: +$426.32 (+7.1%)                    │
│  Estimated APY: 42.5%                          │
│                                                 │
│  [Manage] [Add Liquidity] [Remove]             │
└─────────────────────────────────────────────────┘
```

#### Position Detail View (모달 또는 서브페이지)
- **Timeline Chart**: 시간에 따른 포지션 구성 변화
- **Price Impact Chart**: 토큰 가격 변동 vs 포지션 가치
- **Fee Accumulation Chart**: 수수료 누적 그래프
- **IL Tracker**: Impermanent Loss 추적
- **Transaction History**: 모든 입출금 내역

---

### 3.3 Dashboard - Explore (`/app/explore`)

#### Filters
- DEX 선택 (All, HyperSwap, etc.)
- Pool 선택
- Time Range
- ROI Range
- Position Size Range

#### Leaderboard Table
| Rank | Address | Pool | DEX | Initial | Current | Real ROI | APY | Duration |
|------|---------|------|-----|---------|---------|----------|-----|----------|
| 1 | 0x1234...abcd | ETH/USDC | HyperSwap | $10,000 | $15,234 | +52.3% | 89% | 214d |
| 2 | 0x5678...efgh | HYPE/USDC | HyperDEX | $5,000 | $7,123 | +42.5% | 76% | 180d |

#### Position Detail (클릭 시)
- 해당 포지션의 상세 분석
- "Copy Strategy" 버튼 (동일 풀에 LP 공급)

---

### 3.4 Dashboard - Analytics (`/app/analytics`)

#### Pool Analytics
- **Pool Comparison Chart**: 풀별 실제 ROI 비교
- **Risk/Return Matrix**: 리스크 대비 수익률 시각화
- **Volume & TVL Trends**: 거래량 및 TVL 추이

#### Market Overview
- Top Performing Pools (실제 ROI 기준)
- Highest Fee Generating Pools
- Most Stable Pools (낮은 IL)
- Trending Pools

#### Personal Analytics (지갑 연결 시)
- Portfolio Allocation
- Historical Performance
- Risk Assessment

---

### 3.5 Dashboard - Vaults (`/app/vaults`)

#### Vault Types

##### A. IL Insurance Vault (Stablecoin)
```
┌─────────────────────────────────────────────────┐
│  🛡️ IL Insurance Vault                          │
│  ─────────────────────────────────              │
│  Deposit USDC to provide IL insurance coverage  │
│                                                 │
│  TVL: $2,450,000                               │
│  APY: 8.5%                                     │
│  Utilization: 65%                              │
│                                                 │
│  Your Deposit: 10,000 USDC                     │
│  Earned: 234.56 USDC                           │
│                                                 │
│  [Deposit] [Withdraw]                          │
└─────────────────────────────────────────────────┘
```

##### B. Managed LP Vaults (Data-Driven)
```
┌─────────────────────────────────────────────────┐
│  📊 Alpha Vault #1 - Blue Chip Focus            │
│  ─────────────────────────────────              │
│  Data-driven LP management for major pairs      │
│                                                 │
│  Strategy: ETH/USDC, BTC/USDC weighted         │
│  TVL: $5,200,000                               │
│  30d ROI: +4.2%                                │
│  APY: 35.6%                                    │
│  Risk Level: Low                               │
│                                                 │
│  [View Strategy] [Deposit] [Withdraw]          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  📊 Alpha Vault #2 - High Yield                 │
│  ─────────────────────────────────              │
│  Aggressive LP allocation for higher returns    │
│                                                 │
│  Strategy: Multi-pool dynamic allocation        │
│  TVL: $1,800,000                               │
│  30d ROI: +8.7%                                │
│  APY: 72.3%                                    │
│  Risk Level: Medium-High                       │
│                                                 │
│  [View Strategy] [Deposit] [Withdraw]          │
└─────────────────────────────────────────────────┘
```

#### Vault Detail Page
- Strategy Explanation
- Historical Performance Chart
- Current Allocations
- Rebalancing History
- Fee Structure

---

## 4. 핵심 컴포넌트

### 4.1 LP Position Card
- Initial/Current 토큰 구성 비교
- 실시간 가격 반영
- ROI 계산 (수수료 - IL + 보험)

### 4.2 Portfolio Composition Chart
- 시간에 따른 토큰 비율 변화 시각화
- Stacked Area Chart 형태

### 4.3 IL Insurance Badge
- 보험 적용 여부 표시
- 커버리지 비율 표시

### 4.4 Real ROI Calculator
```
Real ROI = Fees Earned - IL Loss + Insurance Payout - Gas Fees
```

### 4.5 Position Timeline
- 모든 이벤트를 시간순 표시
- 가격 변동 오버레이

---

## 5. UI/UX 가이드라인

### 5.1 Color Scheme
- **Primary**: #6366F1 (Indigo) - 신뢰, 데이터
- **Secondary**: #10B981 (Emerald) - 수익, 긍정
- **Danger**: #EF4444 (Red) - 손실, 경고
- **Neutral**: #1F2937 (Dark Gray) - 배경
- **Accent**: #F59E0B (Amber) - 보험, 보호

### 5.2 Typography
- Headings: Inter (Bold)
- Body: Inter (Regular)
- Numbers/Data: JetBrains Mono

### 5.3 Design Principles
- **Data-First**: 모든 결정은 데이터로 뒷받침
- **Transparency**: 숨기지 않고 모든 정보 공개
- **Simplicity**: 복잡한 DeFi를 쉽게 이해
- **Trust**: 신뢰를 주는 깔끔한 디자인

---

## 6. 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Recharts / VChart
- **State**: Jotai / Zustand
- **Web3**: wagmi + viem

### Data
- **Indexer**: Custom indexer for LP position tracking
- **Cache**: Redis
- **Database**: PostgreSQL

---

## 7. MVP 개발 우선순위

### Phase 1 - Core (데모 페이지)
1. ✅ Landing Page
2. ✅ Position Card 컴포넌트
3. ✅ Mock 데이터 기반 대시보드
4. ✅ 기본 차트 시각화

### Phase 2 - Integration
1. 지갑 연결
2. 실제 온체인 데이터 연동
3. DEX 통합 (HyperSwap)

### Phase 3 - Advanced Features
1. Explore 기능
2. IL Insurance 모듈
3. Vault 시스템

### Phase 4 - Production
1. 성능 최적화
2. 보안 감사
3. 정식 런칭

---

## 8. 경쟁 분석

| 기능 | Meta DEX | Uniswap | Balancer | Curve |
|------|----------|---------|----------|-------|
| 과거 LP 데이터 | ✅ | ❌ | ❌ | ❌ |
| 실제 ROI 표시 | ✅ | ❌ | Partial | ❌ |
| 포지션 비교 | ✅ | ❌ | ❌ | ❌ |
| IL Insurance | ✅ | ❌ | ❌ | ❌ |
| Multi-DEX 통합 | ✅ | ❌ | ❌ | ❌ |

---

## 9. 다음 단계

1. 이 기획안 리뷰 및 피드백 반영
2. Figma 디자인 작업 (또는 바로 코드로 구현)
3. Landing Page 구현
4. Position Card 컴포넌트 개발
5. Mock 데이터 기반 대시보드 구현

---

*Last Updated: 2025-12-03*
