import zzalang from "../assets/zzalang.png";
import mando from "../assets/mando.png";
import omok from "../assets/omok.png";
import doit from "../assets/doit.png";
import bagel from "../assets/bagel.png";

export type ProjectLink = { label: string; href: string };

// 링크 버튼 표시 순서: GitHub 먼저, 그다음 Live
const LINK_ORDER: Record<string, number> = { GitHub: 0, Live: 1 };
export const orderLinks = (links: ProjectLink[]) =>
  [...links].sort(
    (a, b) => (LINK_ORDER[a.label] ?? 9) - (LINK_ORDER[b.label] ?? 9),
  );

export type Contribution = { head: string; body?: string };
export type Trouble = {
  title?: string;
  problem: string;
  solution: string;
  learned?: string;
};
export type DetailBlock =
  | { type: "bullets"; title: string; items: Contribution[] }
  | { type: "trouble"; title: string; items: Trouble[] }
  | { type: "text"; title: string; body: string };

export type Project = {
  name: string;
  /** Short ASCII label shown on the Nokia LCD (pixel font can't render Korean) */
  lcd: string;
  tagline: string;
  /** 기획 의도 — shown on the portfolio page (preview) */
  intent: string;
  group: "팀 프로젝트" | "개인 프로젝트";
  period: string;
  team?: string;
  stack: string[];
  highlights: string[];
  image?: string;
  links: ProjectLink[];
  /** Full case-study content (작업 기여도 / 트러블슈팅 / 기획·확장·리팩토링) — shown in modal */
  detail?: DetailBlock[];
};

export const projects: Project[] = [
  {
    name: "Zzalang",
    lcd: "Zzalang",
    tagline: "백엔드 API와 연동된 게시판 서비스",
    intent:
      "백엔드 API와 연동된 게시판을 직접 구현하며, 데이터 기반 UI 설계와 협업 경험을 쌓기 위해 진행한 팀 프로젝트입니다.",
    group: "팀 프로젝트",
    period: "진행 중",
    team: "FE 1 · BE 1",
    stack: ["HTML", "CSS Module", "TypeScript", "React"],
    highlights: [
      "인증 상태에 따른 화면 제어 및 API 연동",
      "목록 페이지네이션 구조 설계",
      "검색 조건 기반 서버 데이터 요청 구조 설계",
      "카테고리 필터: 관리자/이용자 화면 분리 + 전역 상태로 중복 요청 제거",
    ],
    image: zzalang,
    links: [{ label: "GitHub", href: "https://github.com/jisangjiha/zzalang" }],
    detail: [
      {
        type: "bullets",
        title: "작업 · 기여도",
        items: [
          {
            head: "인증 기반 화면 흐름 설계 및 API 연동",
            body: "사용자의 인증 상태에 따라 게시글 작성 버튼 노출을 제어해, 접근 가능한 페이지가 달라지도록 구현.",
          },
          {
            head: "게시글 목록 페이지네이션 구조 설계",
            body: "서버에서 전달받는 페이지 정보를 기준으로 페이지네이션 UI를 구성.",
          },
          {
            head: "검색 기능 UI–API 연계 구현",
            body: "검색 기능을 구현하고 페이지네이션도 함께 동작하도록 상태 구조를 정리.",
          },
        ],
      },
      {
        type: "trouble",
        title: "트러블슈팅",
        items: [
          {
            title: "카테고리 필터링 구현 및 상태 관리 개선",
            problem:
              "백엔드는 카테고리를 직접 관리하는 구조였지만 프론트엔드에서는 이용자가 선택만 하도록 제한된 UX를 제공하려 했고, 카테고리 변경마다 중복 API 요청이 발생해 로딩이 길어짐.",
            solution:
              "이용자 화면과 분리된 임시 관리자 페이지로 카테고리 편집을 분리하고, 각 컴포넌트에서 개별 fetch하던 구조를 전역 상태로 통합해 중복 요청을 제거.",
            learned:
              "백엔드 구조를 그대로 따르기보다 사용자 경험을 고려해 프론트엔드에서 구조를 재정리하는 판단이 중요하며, 상태 관리에 따라 성능·사용성이 크게 달라짐을 체감.",
          },
        ],
      },
    ],
  },
  {
    name: "Mando",
    lcd: "Mando",
    tagline: "투두 리스트로 만다라트 계획표 실천을 돕는 서비스",
    intent:
      "만다라트 계획표를 투두 리스트로 실천하도록 돕는 서비스로, 큰 목표를 작은 실행 단위로 쪼개는 흐름을 화면으로 풀어내고자 했습니다.",
    group: "팀 프로젝트",
    period: "2024.01.30 – 2024.03.20",
    team: "기획 1 · 디자인 2 · FE 2 · BE 2",
    stack: ["HTML", "CSS Module", "SCSS", "JavaScript", "React", "Axios"],
    highlights: [
      "SCSS 스타일링 최적화 (변수·중첩·모듈화)",
      "useState 기반 상태 관리",
      "API 데이터 불일치 처리 — 명세 시각화로 정렬",
      "useMemo/useCallback으로 불필요한 렌더링 개선",
    ],
    image: mando,
    links: [
      { label: "Live", href: "https://mandomando.swygbro.com/mando" },
      { label: "GitHub", href: "https://github.com/swyp-3th-8team/frontend" },
    ],
    detail: [
      {
        type: "bullets",
        title: "작업 · 기여도",
        items: [
          {
            head: "SCSS를 활용한 스타일링 최적화",
            body: "변수·중첩·모듈화를 적극 활용해 재사용성을 높이고, 규모가 커질 때의 스타일 복잡성을 효과적으로 관리.",
          },
          {
            head: "useState를 통한 상태 관리",
            body: "사용자 입력, API 호출 결과 등 다양한 상태를 효율적으로 관리.",
          },
        ],
      },
      {
        type: "trouble",
        title: "트러블슈팅",
        items: [
          {
            title: "API 연동 시 데이터 불일치 및 오류 처리",
            problem:
              "데이터 형식 불일치 및 오류 응답 처리가 미흡해 클라이언트에서 예기치 않은 동작이 발생.",
            solution:
              "API 명세를 시각화해 상세히 정리하고, 이를 기반으로 클라이언트–서버 간 데이터 형식을 일치시킴.",
          },
          {
            title: "불필요한 렌더링",
            problem:
              "불필요한 상태 변화를 트리거해 컴포넌트가 과도하게 렌더링됨.",
            solution:
              "UI에 실제 영향을 주는 상태만 관리하도록 개선하고, useMemo·useCallback으로 메모이제이션하여 불필요한 렌더링을 방지.",
          },
        ],
      },
    ],
  },
  {
    name: "Omok",
    lcd: "Omok",
    tagline: "승리 조건을 알고리즘으로 직접 구현한 오목 게임",
    intent:
      "생성형 AI에 의존하지 않고 스스로 규칙을 분석·구현하며, 문제를 정의하고 로직으로 풀어내는 과정에 집중한 프로젝트입니다.",
    group: "개인 프로젝트",
    period: "진행 중",
    stack: ["HTML", "CSS Module", "TypeScript", "React"],
    highlights: [
      "생성형 AI 없이 렌주룰 기반으로 규칙 분석·구현",
      "오목판 사이즈 조정, 현재 차례 표시, 승리/중복 착수 alert",
      "승리 판정: 4방향 벡터 양방향 확장 탐색으로 연속 5개 검출",
      "확장: 마지막 수 표시, 렌주룰 금수(3-3, 4-4) 판별",
    ],
    image: omok,
    links: [{ label: "GitHub", href: "https://github.com/jisangjiha/omok" }],
    detail: [
      {
        type: "trouble",
        title: "트러블슈팅",
        items: [
          {
            title: "오목 승리 룰 구현",
            problem:
              "개발 초반, 승리 조건을 단순히 ‘같은 색 돌 5개’로 생각해 제대로 된 룰이 구현되지 않음.",
            solution:
              "승리 조건을 ‘현재 돌 기준 연속된 방향성으로 같은 색 돌 5개’로 재정의하고, 가로·세로·대각선 4개 방향 벡터마다 양쪽으로 확장 탐색해 연속 돌 개수를 계산.",
            learned:
              "프론트엔드에서 UI 구현뿐 아니라 알고리즘적 사고와 상태 설계가 중요함을 체감.",
          },
        ],
      },
      {
        type: "bullets",
        title: "확장 방향",
        items: [
          {
            head: "오목 보드 UI 사용성 개선",
            body: "현재 돌 위치·마지막 수를 명확히 표시해 진행 흐름을 직관적으로 인지하도록 개선.",
          },
          {
            head: "렌주룰(3-3, 4-4) 적용",
            body: "금수 조건을 사전 판별하는 로직을 추가하고, 방향 탐색 로직을 확장해 열린 수·닫힌 수를 구분하는 알고리즘 설계 시도 예정.",
          },
        ],
      },
    ],
  },
  {
    name: "do it;",
    lcd: "do it;",
    tagline: "Todo 완료 상태를 한눈에 확인하는 서비스",
    intent:
      "할 일의 완료 상태를 한눈에 확인할 수 있도록, 상태 변화를 시각적으로 명확하게 전달하는 데 집중한 투두 서비스입니다.",
    group: "개인 프로젝트",
    period: "2025.04.03 – 2025.04.09",
    stack: ["HTML", "CSS Module", "TypeScript", "Next.js"],
    highlights: [
      "할 일 추가 / TO DO · DONE 상태 표시",
      "상세: 상태·타이틀 수정, 이미지·메모 추가",
      "UI 동작 로직 및 사용자 경험 개선",
      "Flexbox·미디어쿼리 기반 반응형 레이아웃",
    ],
    image: doit,
    links: [
      { label: "Live", href: "https://codeit-prework.vercel.app/" },
      { label: "GitHub", href: "https://github.com/jisangjiha/codeit-prework" },
    ],
    detail: [
      {
        type: "bullets",
        title: "작업 · 기여도",
        items: [
          {
            head: "UI 동작 로직 및 사용자 경험 개선",
            body: "기능 단위로 상태 변화를 시각적으로 표현하고 예외 상황을 처리해 안정적인 UX를 구현.",
          },
          {
            head: "반응형 레이아웃 구현",
            body: "Flexbox와 미디어쿼리로 다양한 해상도에서 일관된 인터페이스를 유지.",
          },
        ],
      },
      {
        type: "trouble",
        title: "트러블슈팅",
        items: [
          {
            title: "입력 데이터 초기화 문제",
            problem: "폼 제출 시 입력 데이터가 초기화되지 않는 문제 발생.",
            solution:
              "제출 후 각 입력 필드의 상태를 초기값으로 재설정하도록 useState 업데이트 함수를 호출해 정상적으로 초기화.",
            learned: "상태의 보존과 초기화 흐름(스토리지)에 대한 이해를 높임.",
          },
        ],
      },
    ],
  },
  {
    name: "Bagel",
    lcd: "Bagel",
    tagline: "Ess-a-Bagel을 참고한 커스텀 베이글 주문 서비스",
    intent:
      "Ess-a-Bagel을 참고해 커스텀 베이글을 주문하는 서비스로, 컴포넌트 기반 설계와 전역 상태 관리를 연습하기 위한 개인 프로젝트입니다.",
    group: "개인 프로젝트",
    period: "2023.09.20 – 2023.12.28",
    stack: ["HTML", "CSS Module", "JavaScript", "React"],
    highlights: [
      "컴포넌트 기반 아키텍처 설계",
      "Context API 전역 상태 관리",
      "장바구니 수량 동기화(useEffect), 리렌더링 성능 개선",
      "CSS Module → Tailwind CSS 리팩토링 (CSS 약 30% 감소)",
    ],
    image: bagel,
    links: [
      { label: "GitHub", href: "https://github.com/jisangjiha/bagel-project" },
    ],
    detail: [
      {
        type: "bullets",
        title: "작업 · 기여도",
        items: [
          {
            head: "컴포넌트 기반 아키텍처 설계",
            body: "UI 요소를 독립적인 컴포넌트로 분리해 재사용성을 높임.",
          },
          {
            head: "Context API 전역 상태 관리",
            body: "useContext로 전역 상태를 관리해 컴포넌트 간 상태 공유를 쉽게 하고 props drilling을 피함.",
          },
        ],
      },
      {
        type: "trouble",
        title: "트러블슈팅",
        items: [
          {
            title: "장바구니 수량 동기화",
            problem:
              "수량 변경 시 상태 업데이트 지연으로 UI와 실제 데이터가 불일치.",
            solution:
              "useEffect로 수량 변경마다 상태를 즉시 업데이트해 UI에 반영.",
          },
          {
            title: "리렌더링 성능 저하",
            problem:
              "상태 변경으로 불필요한 리렌더링이 발생해 성능 저하가 우려됨.",
            solution:
              "React.memo로 컴포넌트를 메모이제이션하고 useCallback·useMemo로 함수·값을 캐싱해 불필요한 리렌더링을 방지.",
          },
        ],
      },
      {
        type: "text",
        title: "리팩토링 — Tailwind CSS 도입",
        body: "CSS Module로 관리하던 스타일을 Tailwind 유틸리티로 점진적 전환하고, 반복·복잡한 스타일은 @apply로, 컬러·폰트 등 디자인 시스템은 config에 커스터마이징했습니다. 결과적으로 CSS 코드량 약 30% 감소, 재사용성·생산성이 향상됐습니다. (JSX className이 길어지는 가독성 저하는 아쉬운 점.)",
      },
      {
        type: "bullets",
        title: "추가 기능 개선",
        items: [
          {
            head: "주문 완료 Toast",
            body: "명확한 시각 피드백으로 불필요한 재주문을 방지.",
          },
          {
            head: "주문 내역 확인",
            body: "장바구니에서 주문 후 내역을 확인하는 버튼/모달 추가.",
          },
        ],
      },
    ],
  },
];

export const contact = {
  email: "nobledjs@naver.com",
  github: "https://github.com/jisangjiha",
};
