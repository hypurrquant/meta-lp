# Meta DEX - 구현 현황 문서

## 개요

Meta DEX는 HyperEVM 기반의 멀티체인 DEX 애그리게이터로, LP(Liquidity Provider) 데이터 투명성과 IL(Impermanent Loss) 보험 기능을 제공하는 웹 애플리케이션입니다.

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | Next.js 15.0.1 (App Router) |
| React | React 19 RC |
| Styling | Tailwind CSS 3.4 |
| Charts | VChart / React-VChart 1.12.10 |
| State Management | Jotai 2.10.1 |
| UI Components | Radix UI (Dropdown, Popover) |
| Icons | Lucide React |
| Theme | next-themes |
| Date | date-fns, react-day-picker |

---

## 프로젝트 구조

```
src/
├── app/
│   ├── (landing)/          # 랜딩 페이지 (/)
│   ├── app/                # 메인 앱 대시보드
│   │   ├── positions/      # 내 포지션 페이지
│   │   ├── explore/        # 탐색 페이지
│   │   ├── analytics/      # 분석 페이지
│   │   └── vaults/         # 볼트 페이지
│   └── ticket/             # 티켓 시스템 (레거시)
├── components/
│   ├── landing/            # 랜딩 페이지 컴포넌트
│   ├── app/                # 앱 전용 컴포넌트
│   ├── nav/                # 네비게이션 컴포넌트
│   ├── ui/                 # 공통 UI 컴포넌트
│   ├── chart-blocks/       # 차트 컴포넌트
│   └── providers/          # Context Providers
├── config/                 # 사이트 설정
├── data/                   # Mock 데이터
├── hooks/                  # Custom Hooks
├── lib/                    # 유틸리티 함수
├── style/                  # 전역 스타일
└── types/                  # TypeScript 타입 정의
```

---

## 구현된 페이지

### 1. Landing Page (`/`)

완전히 구현된 마케팅 랜딩 페이지입니다.

#### 구성 요소:
- **Navbar**: 상단 네비게이션 바
- **Hero Section**:
  - 헤드라인: "See Beyond the APY"
  - 서브헤드라인 및 CTA 버튼 (Launch App, Explore Positions)
  - Feature Pills (Real ROI Tracking, IL Insurance, Multi-DEX Aggregation)
  - 예시 LP 포지션 카드 시각화
- **Features Section**: 6가지 핵심 기능 소개
  - LP Analytics, Real ROI, Position Explorer
  - IL Insurance, Multi-DEX Integration, Data-Driven Vaults
- **How It Works Section**: 4단계 사용 가이드
  - Connect Wallet → Analyze Positions → Provide Liquidity → Enable Insurance
- **Stats Section**: 실시간 프로토콜 통계 (애니메이션 포함)
  - TVL: $124.5M, Positions: 12,847, Average ROI: 34.7%, Insurance Pool: $8.2M
- **Supported DEXs Section**: 통합된 DEX 로고들
- **Footer**: 하단 푸터

---

### 2. My Positions (`/app/positions`)

사용자의 LP 포지션을 관리하는 대시보드 페이지입니다.

#### 구성 요소:
- **Portfolio Summary**: 4개 지표 카드
  - Total Value, Total Fees Earned, Real ROI, Insured Positions
- **Position Cards**: 각 LP 포지션 상세 카드
  - 토큰 페어 뱃지 (ETH, USDC, BTC, HYPE)
  - DEX 태그 (HyperSwap, HyperDEX, NovaSwap)
  - 보험 상태 표시
  - Initial Deposit vs Current Position 비교
  - Portfolio Composition 차트 (스택 바 차트)
  - ROI Summary (Fees Earned, IL Loss, Insurance, Real ROI)
  - 예상 APY 표시
  - 액션 버튼 (Manage, Add Liquidity)
- **필터링**: DEX별, 정렬 기준별

#### Mock 데이터:
- 4개의 예시 포지션 (ETH/USDC, HYPE/USDC, BTC/USDC, ETH/HYPE)

---

### 3. Explore (`/app/explore`)

다른 사용자의 성공적인 LP 전략을 탐색하는 페이지입니다.

#### 구성 요소:
- **Top Pools**: 5개 인기 풀 통계 카드
  - TVL, 24h Volume, Avg APY, Positions 수
- **검색 & 필터**:
  - 주소/풀 검색
  - DEX 필터
  - Pool 필터
  - 정렬 옵션 (ROI, APY, Value, Duration)
  - More Filters 버튼
- **Position Leaderboard**: 랭킹 테이블
  - Rank (1-3위 특별 스타일링)
  - Address (복사 기능)
  - Pool, DEX, Initial/Current Value
  - Real ROI, APY, Duration
  - Insured 상태
  - Copy Strategy 액션 버튼
- **Pagination**: 페이지네이션 UI

#### Mock 데이터:
- 10개의 예시 리더보드 포지션
- 5개의 풀 통계

---

### 4. Analytics (`/app/analytics`)

풀 성과 및 시장 트렌드 분석 페이지입니다.

#### 구성 요소:
- **Market Overview**: 4개 지표 카드
  - Total TVL ($127.5M), 24h Volume ($32.2M)
  - Active Positions (4,808), Avg IL (-2.4%)
- **Pool Performance Table**: 풀별 성과 테이블
  - Pool, Avg ROI, TVL, Risk Level
  - 5개 풀 데이터
- **ROI Distribution**: 원형 차트 시각화 (Placeholder)
  - Average Real ROI: 34%
  - Positive/Negative 비율 표시
- **Impermanent Loss Analysis**:
  - Average IL (All Pools)
  - IL Insurance Saved
  - Lowest IL Pool
  - IL by Pool 바 차트 (5개 풀)

---

### 5. Vaults (`/app/vaults`)

IL 보험 및 관리형 LP 볼트 페이지입니다.

#### 구성 요소:
- **IL Insurance Vault**:
  - TVL: $8.2M, APY: 8.5%, Utilization: 65%
  - 사용자 포지션 (예치금, 수익)
  - Deposit/Withdraw 버튼
  - How it works 설명 배너
- **Managed LP Vaults**: 3개 관리형 볼트
  - **Blue Chip LP Vault** (Low Risk): ETH/USDC, BTC/USDC 중심
  - **High Yield Vault** (Medium-High Risk): ETH/HYPE, HYPE/USDC 중심
  - **Stablecoin Yield Vault** (Very Low Risk): USDC/USDT, USDC/DAI
  - 각 볼트별: TVL, APY, 30d ROI, Risk Level
  - Allocation 시각화
  - 사용자 포지션 표시
- **Coming Soon**: 추가 볼트 예고

---

## 구현된 컴포넌트

### Landing 컴포넌트
| 컴포넌트 | 파일 | 설명 |
|----------|------|------|
| Navbar | `landing/navbar.tsx` | 상단 네비게이션 |
| HeroSection | `landing/hero-section.tsx` | 히어로 섹션 |
| FeaturesSection | `landing/features-section.tsx` | 기능 소개 |
| HowItWorksSection | `landing/how-it-works-section.tsx` | 사용 가이드 |
| StatsSection | `landing/stats-section.tsx` | 프로토콜 통계 |
| SupportedDexsSection | `landing/supported-dexs-section.tsx` | DEX 목록 |
| Footer | `landing/footer.tsx` | 푸터 |

### App 컴포넌트
| 컴포넌트 | 파일 | 설명 |
|----------|------|------|
| PositionCard | `app/position-card.tsx` | LP 포지션 카드 |
| PortfolioSummary | `app/portfolio-summary.tsx` | 포트폴리오 요약 |

### Navigation 컴포넌트
| 컴포넌트 | 파일 | 설명 |
|----------|------|------|
| SideNav | `nav/side-nav/index.tsx` | 사이드 네비게이션 |
| TopNav | `nav/top-nav.tsx` | 상단 네비게이션 |

### UI 컴포넌트
| 컴포넌트 | 파일 | 설명 |
|----------|------|------|
| Button | `ui/button.tsx` | 버튼 (variants) |
| Calendar | `ui/calendar.tsx` | 달력 (react-day-picker) |
| DropdownMenu | `ui/dropdown-menu.tsx` | 드롭다운 메뉴 |
| Popover | `ui/popover.tsx` | 팝오버 |

---

## 데이터 구조

### Position 타입
```typescript
interface Position {
  id: string;
  pool: string;           // "ETH/USDC"
  dex: string;            // "HyperSwap"
  token0: string;
  token1: string;
  initialDeposit: {
    token0: TokenAmount;
    token1: TokenAmount;
    totalValueUsd: number;
    date: string;
  };
  currentPosition: {
    token0: TokenAmount;
    token1: TokenAmount;
    totalValueUsd: number;
  };
  feesEarned: number;
  ilLoss: number;
  insuranceClaim: number;
  realRoi: number;
  realRoiPercent: number;
  estimatedApy: number;
  daysActive: number;
  isInsured: boolean;
  compositionHistory: number[];
}
```

---

## 디자인 시스템

### Color Palette
- **Primary**: Indigo (#6366F1) - 신뢰, 데이터
- **Secondary**: Emerald (#10B981) - 수익, 긍정
- **Danger**: Red (#EF4444) - 손실, 경고
- **Warning**: Amber (#F59E0B) - 보험, 보호
- **Neutral**: Dark Gray 배경

### UI 특징
- Glass morphism 효과 (backdrop-blur, border 투명도)
- Gradient 배경 및 텍스트
- 호버 시 Glow 효과
- 반응형 디자인 (sm, md, lg, xl breakpoints)
- Dark mode 기본

---

## 개발 현황 (Phase 1 완료)

### 완료된 항목
- [x] Landing Page 전체 구현
- [x] App Layout (Side Navigation)
- [x] Position Card 컴포넌트
- [x] Portfolio Summary 컴포넌트
- [x] My Positions 페이지
- [x] Explore 페이지 (Leaderboard)
- [x] Analytics 페이지
- [x] Vaults 페이지
- [x] Mock 데이터 시스템
- [x] 반응형 디자인
- [x] Dark mode 지원

### 미구현 항목 (Phase 2+)
- [ ] 지갑 연결 (wagmi + viem)
- [ ] 실제 온체인 데이터 연동
- [ ] DEX 통합 (HyperSwap 등)
- [ ] 실시간 가격 피드
- [ ] IL Insurance 스마트 컨트랙트
- [ ] Vault 스마트 컨트랙트
- [ ] 트랜잭션 기능
- [ ] 사용자 인증/세션

---

## 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

---

## 라우팅 구조

| 경로 | 설명 |
|------|------|
| `/` | 랜딩 페이지 |
| `/app` | 대시보드 (→ /app/positions 리다이렉트) |
| `/app/positions` | 내 포지션 |
| `/app/explore` | 포지션 탐색 |
| `/app/analytics` | 분석 |
| `/app/vaults` | 볼트 |

---

*Last Updated: 2025-12-03*
