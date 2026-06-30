export type Skill = { name: string; desc: string };

/** Concrete "how I use it" descriptions, condensed from 홍지상_포트폴리오.pdf */
export const frontendSkills: Skill[] = [
  { name: "HTML & CSS", desc: "시맨틱 마크업과 Flexbox·Grid로 반응형 페이지 구현" },
  { name: "CSS Module & SCSS", desc: "컴포넌트 기반 스타일링으로 유지보수성 향상" },
  { name: "JavaScript", desc: "비동기로 API 통신을 처리하고 모듈화로 재사용성 향상" },
  { name: "TypeScript", desc: "타입 선언으로 변수·함수 타입을 명시해 안정성 확보" },
  { name: "React", desc: "Hook·상태 관리로 SPA 개발, Context API로 전역 상태 관리" },
  { name: "Next.js", desc: "SSR로 초기 로딩 개선, 파일 기반 라우팅으로 페이지 관리" },
  { name: "Chakra UI", desc: "기본 UI 컴포넌트를 활용한 빠른 화면 구성" },
  { name: "Axios", desc: "RESTful API 통신과 비동기 데이터 처리" },
  { name: "Vite", desc: "개발 서버 구축과 빠른 모듈 번들링" },
  { name: "Storybook", desc: "컴포넌트 단위 UI 개발·테스트" },
  { name: "Playwright", desc: "사용자 시나리오 기반 E2E 테스트 자동화" },
];

export const collabTools: Skill[] = [
  { name: "VS Code", desc: "확장 프로그램·단축키로 개발 효율 향상" },
  { name: "Git & GitHub", desc: "버전 관리와 코드 협업" },
  { name: "Notion · Figma · Slack", desc: "팀 커뮤니케이션과 협업" },
];
