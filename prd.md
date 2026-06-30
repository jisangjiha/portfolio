# PRD — 자기소개 홈페이지 (Jisang Portfolio)

## 1. 개요

| 항목 | 내용 |
|---|---|
| 제품명 | Jisang — 자기소개 / 포트폴리오 원페이지 |
| 목적 | 채용 담당자가 지원자(Jisang)의 자기소개와 포트폴리오를 한눈에 확인하고 채용 여부를 판단할 수 있게 한다 |
| 형태 | 싱글 페이지(One-page) 랜딩 + 섹션 스크롤 |
| 핵심 컨셉 | 레트로(옛날 피처폰/도트) 감성을 입힌 미니멀하고 차분한 자기소개 사이트 |

## 2. 목표 & 성공 지표

- **1차 목표:** 채용 담당자가 30초 안에 "누구인지 / 무엇을 할 수 있는지 / 어떻게 연락하는지"를 파악할 수 있다.
- **성공 지표(정성):**
  - 첫 화면(Hero)에서 이름과 정체성이 즉시 전달된다.
  - 포트폴리오 섹션에서 대표 작업물로 자연스럽게 이동한다.
  - 연락처 섹션에서 다음 행동(이메일/링크 클릭)이 명확하다.

## 3. 타겟 사용자

- **주 사용자:** 채용 담당자 (데스크톱 사용 비중 높음, 모바일도 고려)
- **사용 맥락:** 짧은 시간에 여러 지원자를 검토 → 빠른 스캔성 + 강한 첫인상이 중요

## 4. 기술 스택

> `prompt 예시.txt`의 스택을 그대로 계승한다.

- **React 19**
- **Tailwind CSS v4** (테마 변수 기반 디자인 토큰)
- **motion/react** (애니메이션)
- 단일 `App.tsx`에 핵심 컴포넌트 구성, 섹션 단위로 분리

### 폰트 / 글로벌 설정
- Google Fonts: **Instrument Serif** (400, italic 400), **Inter** (100–900)
- 커스텀 폰트(도트/피처폰 감성): **Nokia Cellphone FC Small**
  - `@import url('https://db.onlinewebfonts.com/c/440b53b1a1c65037f944ff19259d8014?family=Nokia+Cellphone+FC+Small');`
- Tailwind 테마 변수
  - `--font-instrument: "Instrument Serif", serif;`
  - `--font-serif: "Instrument Serif", serif;`
  - `--font-sans: "Inter", sans-serif;`
  - `--font-nokia: "Nokia Cellphone FC Small", monospace;`
- 루트 `font-family`는 `var(--font-sans)`, 안티앨리어싱 적용

## 5. 정보 구조 (메뉴)

상단 고정 네비게이션(pill 형태)에 아래 메뉴를 노출한다.

| 메뉴 | 역할 | 비고 |
|---|---|---|
| **홈** | 최상단 Hero로 이동 | 로고 클릭 = 홈 이동 |
| **자기소개** | 소개 섹션으로 스크롤 | About |
| **포트폴리오** | 작업물 섹션으로 스크롤 | Portfolio |
| **연락처** | 연락 섹션으로 스크롤 | Contact |

- **로고(제목 = 홈 버튼):** 텍스트 **"Jisang"**
  - 스타일: `font-instrument`, `text-[28px]`, `tracking-tight`, `text-[#1a1a1a]`
  - 클릭 시 페이지 최상단으로 부드럽게 이동
- 메뉴 링크: 모바일에서는 숨김, 데스크톱에서 `flex gap-10`, `font-sans text-[14px]`, hover 시 opacity 페이드
- CTA 버튼(예: "연락하기"): `bg-#0871E7` 계열, rounded-full, 흰색 텍스트 → 클릭 시 연락처 섹션 이동

## 6. 기능 요구사항 (섹션별)

### 6.1 Navbar (상단 고정)
- 컨테이너: `fixed top-6`, 가로 중앙(`left-1/2 -translate-x-1/2`), `w-[95%] max-w-5xl`, `z-50`, `pointer-events-none`
- nav 태그: `pointer-events-auto`, backdrop blur, rounded-full pill, 투명 배경 + `border border-black/10`, 항목 사이 `justify-between`
- 구성: 좌측 로고("Jisang"), 우측 메뉴 + CTA 버튼
- 메뉴 클릭 시 해당 섹션으로 **부드러운 앵커 스크롤**

### 6.2 Hero (홈)
- 컨테이너: `min-h-screen`, 배경 `bg-[#F3F4ED]`, `pt-24 md:pt-32`, 세로 중앙 정렬
- **배경 영상:** `absolute inset-0 z-0`, HTML5 `<video>` (autoplay, loop, muted, playsInline, `object-cover`)
  - 소스: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4`
  - 위에 `bg-white/5` 틴트 div 오버레이
- **헤드라인(제안):** "Hi, I'm Jisang. <br /> Frontend Developer."
  - 애니메이션: `motion.div`, opacity 0→1 / scale 0.95→1, 1.5s, ease `[0.16, 1, 0.3, 1]`
  - 스타일: `font-instrument text-[38px] md:text-[56px] lg:text-[72px] leading-[0.85] tracking-tight text-[#1a1a1a] mb-6`
- **서브 헤드라인(제안):** "사용자 경험과 문제 해결에 집중하는 프론트엔드 개발자입니다. 규칙을 직접 분석하고 로직으로 풀어내는 과정을 즐깁니다."
  - 애니메이션: opacity 0→1 / y 20→0, 1.2s, delay 0.3, ease `[0.16, 1, 0.3, 1]`
  - 스타일: `font-sans text-[16px] md:text-[18px] text-[#1a1a1a]/70 leading-relaxed max-w-xl mx-auto`
- 영상 속 폰 화면 위에 **TypingMessages** 컴포넌트 오버랩

### 6.3 자기소개 (About)
> 출처: `홍지상_포트폴리오.pdf` (텍스트 추출)

- **한 줄 소개:** 사용자 경험과 문제 해결에 집중하는 프론트엔드 개발자
- **소개 문단:** 생성형 AI에 의존하지 않고 스스로 규칙을 분석·구현하며 문제 해결 능력을 키워온 프론트엔드 개발자. 백엔드 API 연동, 상태 관리 최적화, 반응형 UI 구현 경험을 보유.
- **기술 스택 (Frontend):**
  - HTML & CSS — 시맨틱 마크업, Flexbox/Grid 반응형 구현
  - CSS Module & SCSS — 컴포넌트 기반 스타일링, 유지보수성 향상
  - JavaScript — 비동기 API 통신, 모듈화
  - TypeScript — 타입 명시로 코드 안정성 향상
  - React — Hook/상태 관리 기반 SPA, Context API 전역 상태 관리
  - Next.js — SSR 초기 로딩 개선, 파일 기반 라우팅
  - Chakra UI, Axios, Vite
  - Storybook(컴포넌트 단위 UI 개발/테스트), Playwright(E2E 테스트 자동화)
- **협업 툴:** VS Code, Git & GitHub, Notion, Figma, Slack
- 스크롤 진입 시 fade/slide-in 등장 애니메이션, 스택은 키워드 칩/카드 형태로 표현

### 6.4 포트폴리오 (Portfolio)
> 출처: `홍지상_포트폴리오.pdf`. 카드 그리드(이미지/제목/한 줄 설명/스택/링크), hover 인터랙션, 스크롤 진입 애니메이션.
> 대표 이미지 4종은 프로젝트 폴더에 위치(`포폴대표이미지_*.png`). Zzalang은 이미지 없음 → 플레이스홀더 카드로 처리.

**팀 프로젝트**

**1) Zzalang (짤랑) — 게시판 서비스**
- 기간: 진행 중 / 팀 구성: FE 1, BE 1
- 스택: HTML, CSS Module, TypeScript, React / VS Code, Git, GitHub
- 목적: 백엔드 API와 연동된 게시판 서비스를 구현하며 데이터 기반 UI 설계·협업 경험을 쌓기 위한 팀 프로젝트
- 주요 기능: 인증 상태에 따른 화면 제어, 목록 페이지네이션, 검색 조건 기반 서버 데이터 요청 구조 설계
- 기여: 인증 기반 화면 흐름 설계 및 API 연동, 페이지네이션 구조 설계, 검색 기능 UI–API 연계
- 트러블슈팅: 카테고리 필터링 구현 시 관리자/이용자 화면 분리 + 전역 상태로 중복 API 요청 제거
- 대표 이미지: ⚠️ 없음 (텍스트/플레이스홀더 카드로 처리 — 추후 이미지 추가 가능)
- GitHub: https://github.com/jisangjiha/zzalang

**2) Mando (만두) — 투두 리스트로 만다라트 계획표 실천을 돕는 서비스**
- 기간: 2024.01.30 ~ 2024.03.20 / 팀 구성: 기획 1, 디자인 2, FE 2, BE 2
- 스택: HTML, CSS Module, SCSS, JavaScript, React, Axios / VS Code, Git, GitHub, Figma, Notion
- 화면: 미리보기 페이지, 메인 페이지(만다라트 입력), 상세 모달(하위목표 계획/다짐)
- 기여: SCSS 스타일링 최적화(변수·중첩·모듈화), useState 기반 상태 관리
- 트러블슈팅: API 데이터 불일치 처리(명세 시각화), 불필요한 렌더링 개선(useMemo/useCallback)
- 대표 이미지: `포폴대표이미지_mando.png`
- 배포: https://mandomando.swygbro.com/mando
- GitHub: https://github.com/swyp-3th-8team/frontend

**개인 프로젝트**

**3) Omok — 승리 조건을 알고리즘으로 구현한 오목 게임**
- 기간: 진행 중
- 개요: 생성형 AI 없이 렌주룰 기반으로 제작 (규칙 분석·로직 구현에 집중)
- 스택: HTML, CSS Module, TypeScript, React / VS Code, Git, GitHub
- 기능: 오목판 사이즈 조정, 현재 차례 표시, 승리/중복 착수 alert
- 트러블슈팅: 승리 조건을 "연속 방향성 기준 같은 색 5개"로 재정의, 4방향 벡터 양방향 확장 탐색
- 확장 방향: 마지막 수 표시, 렌주룰 금수(3-3, 4-4) 판별 로직
- 대표 이미지: `포폴대표이미지_omok.png`
- GitHub: https://github.com/jisangjiha/omok

**4) do it; — Todo 완료 상태를 한눈에 확인하는 서비스**
- 기간: 2025.04.03 ~ 2025.04.09
- 스택: HTML, CSS Module, TypeScript, Next.js / Vercel, VS Code, Git, GitHub
- 화면: 메인(할 일 추가, TO DO/DONE 표시), 상세(상태·타이틀 수정, 이미지·메모 추가)
- 기여: UI 동작 로직 및 사용자 경험 개선, 반응형 레이아웃(Flexbox·미디어쿼리)
- 트러블슈팅: 폼 제출 후 입력 데이터 초기화 처리
- 대표 이미지: `포폴대표이미지_doit.png`
- 배포: https://codeit-prework.vercel.app/
- GitHub: https://github.com/jisangjiha/codeit-prework

**5) 베이글 프로젝트 — Ess-a-Bagel을 참고한 커스텀 베이글 주문 서비스**
- 기간: 2023.09.20 ~ 2023.12.28
- 스택: HTML, CSS Module, JavaScript, React / VS Code, Git, GitHub
- 화면: 메인(메뉴 탭별 상세·가격), 장바구니 모달(총액 확인, 수량 변경)
- 기여: 컴포넌트 기반 아키텍처 설계, Context API 전역 상태 관리
- 트러블슈팅: 장바구니 수량 동기화(useEffect), 리렌더링 성능 개선(React.memo/useCallback/useMemo)
- 리팩토링: CSS Module → Tailwind CSS 도입 (CSS 코드량 약 30% 감소), 주문 완료 Toast·주문 내역 기능 추가
- 대표 이미지: `포폴대표이미지_bagel.png`
- GitHub: https://github.com/jisangjiha/bagel-project

### 6.5 연락처 (Contact)
> 출처: `홍지상_포트폴리오.pdf`

- 이메일: nobledjs@naver.com
- GitHub: https://github.com/jisangjiha
- 전화: 010-3347-2408 *(웹 공개)*
- 상단 네비 우측 "연락하기" 버튼 클릭 시 → 이 연락처 섹션으로 부드럽게 스크롤
- 섹션 내에는 이메일(mailto 링크)·이메일 복사 버튼·GitHub 링크 노출

## 7. 애니메이션 요구사항

### 7.1 부드러운 스크롤
- 메뉴/로고 클릭 시 섹션 간 **smooth scroll** 적용
- 페이지 전반의 스크롤 감속이 부드럽게 느껴지도록 처리 (CSS `scroll-behavior: smooth` 또는 스무스 스크롤 라이브러리)
- 섹션 진입 시 motion/react 기반 등장 애니메이션

### 7.2 커스텀 마우스 포인터 (옛날 / 레트로 감성)
- 기본 커서를 숨기고, **도트/피처폰 느낌의 커스텀 커서**로 대체
- `prompt 예시.txt`의 톤(Nokia 도트 폰트, 픽셀 감성)과 일관되게 디자인
  - 예: 픽셀화된 사각형/화살표, 도트 잔상(trail), 깜빡임 등 레트로 효과
- 마우스 이동을 부드럽게 따라오도록 motion/react로 처리
- 인터랙티브 요소(링크/버튼) hover 시 커서 상태 변화

### 7.3 타이핑 메시지 (TypingMessages)
- **메시지 배열(수정 반영):** `["Nice to meet u", "I'm Jisang", "This is me!"]`
  - ※ 원본 `["Are you here?", "Yes, I am.", "Speak soon."]` → 위 배열로 교체
- 타이핑 속도 100ms, 삭제 속도 50ms, 삭제 전 대기 2000ms로 순환
- 위치: 영상 속 폰 화면에 정확히 얹히도록 절대 위치
  - `absolute left-[48.5%] md:left-[47.5%] lg:left-[48.5%] -translate-x-1/2 bottom-[32%] z-30 w-[110px] sm:w-[130px] flex justify-start text-left`
- 텍스트 스타일: `font-nokia text-[#2A3616] text-[10px] sm:text-[14px] leading-tight break-words min-h-[1.5em]`
- 커서: 깜빡이는 `motion.span` (`w-1.5 h-3 bg-[#2A3616] ml-1 align-middle`), opacity 0→1→0, 0.8s 무한 반복(linear)

## 8. 디자인 / 스타일 가이드

| 토큰 | 값 |
|---|---|
| 배경 (Hero) | `#F3F4ED` |
| 본문 텍스트 | `#1a1a1a` |
| 포인트(CTA) | `#0871E7` |
| 도트 텍스트 | `#2A3616` |
| 제목 폰트 | Instrument Serif |
| 본문 폰트 | Inter |
| 도트 폰트 | Nokia Cellphone FC Small |

- 전체 톤: 미니멀, 차분, 여백 충분히. 레트로 포인트는 **커서/타이핑 메시지/도트 폰트**에 집중.

## 9. 비기능 요구사항

- **반응형:** 모바일 / 태블릿 / 데스크톱 대응 (메뉴는 모바일에서 접힘 처리)
- **성능:** 배경 영상 자동재생 최적화(muted/playsInline), 폰트·이미지 로딩 고려
- **접근성:** 커스텀 커서 사용 시에도 키보드 포커스/링크 동작 보장, 텍스트 대비 확보
- **브라우저:** 최신 Chrome/Safari/Edge 기준

## 10. 범위 (Scope)

- **포함:** 위 4개 섹션, 커스텀 커서, 부드러운 스크롤, 타이핑 메시지, Hero 영상
- **제외(차후):** 백엔드/CMS, 다국어, 블로그, 폼 제출 서버 처리

## 11. 확정 필요 항목 (TBD)

> 포트폴리오 PDF + 본인 확인으로 모두 확정. 구현 착수 가능.

- [x] 자기소개 본문 텍스트 및 기술 스택 키워드 — PDF에서 반영 (§6.3)
- [x] 포트폴리오 항목(제목/설명/링크) — PDF 5개 프로젝트 반영 (§6.4)
- [x] 연락처 정보(이메일, GitHub) — PDF에서 반영 (§6.5)
- [x] **Hero 헤드라인/서브 헤드라인** — 제안 문구로 우선 진행, 추후 교체 예정 (§6.2)
- [x] **포트폴리오 작업물 이미지** — 대표 이미지 4종 폴더에 확보(Mando/Omok/do it;/베이글). Zzalang만 플레이스홀더
- [x] **전화번호 웹 공개 여부** — 공개 (010-3347-2408 노출)
- [x] **CTA 버튼 동작** — 상단 네비 우측 "연락하기" 버튼 → 클릭 시 연락처 섹션으로 스크롤
- [x] **Zzalang/Omok "진행 중" 표기** — "진행 중" 유지
