# FORGE5 — AI MVP

> **개인 프로젝트** · 웹사이트 + 플레이 가능한 미니게임 + 10개 가상 AI 역할 협업  
> 고용주 Grometric의 업무·코드·데이터와 완전히 분리합니다.

## 구성

| 역할 | 경로 | 담당 |
| --- | --- | --- |
| 아틀라스 | `teams/strategy` | 사업 전략·수익 |
| 루나 | `teams/design` | UI/UX · Figma |
| 코드 | `teams/frontend` | 프론트엔드 · 개발팀 총무 |
| 노바 | `teams/backend` | API · DB |
| 쉴드 | `teams/security` | 인증·인가 · 보안 |
| 모아 | `teams/marketing` | 홍보·고객 |
| 하루 | `teams/content` | 쇼츠 기획 |
| 리오 | `teams/editing` | 영상 편집 |
| 루프 | `teams/automation` | GitHub Actions · 자동화/DevOps · 실행 검증 |
| 브릿지 | `teams/sales` | 영업 · 고객 상담/견적 · 전환 흐름 |

**10명은 한 AI가 역할을 구분해 협업하는 가상 구성**으로, 독립적으로 24시간 근무하는 실제 직원이 아닙니다. 30년 경력은 캐릭터 설정입니다.

## 개발 계획

- 웹사이트와 REFLEX 05 반응속도 게임 MVP
- 서버는 우선 로컬 읽기 전용 API로 개발 (운영 서버는 미배포)
- Node.js 기반 테스트·빌드
- GitHub Actions CI 및 2026-11-21~23 개발 자동화 *제안* 워크플로

GitHub Actions 자동 코딩은 API 키, 저장소 변수 및 실제 워크플로 검증을 마치기 전에는 **실행 중이라고 간주하지 않습니다**. 자동 병합·배포하지 않고 Draft PR 검토를 원칙으로 합니다.

## 실행 (소스 파일 등록 완료 후)

```bash
npm run dev
npm run dev:api
npm run check
```

소스 파일이 모두 업로드되기 전에는 위 명령이 실행되지 않을 수 있습니다.

- [기존 FORGE5 운영 사이트](https://forgefive-ops-2026.higgsfield.app/)
- [기존 카페 데모](https://forgefive-ops-2026.higgsfield.app/sample/cafe)
- [게임 시제품](https://forgefive-ops-2026.higgsfield.app/sample/game)

**상태:** 개인 GitHub 계정 설치·저장소 읽기 권한 확인됨. 소스 파일, CI/Pages 배포 및 자동 개발 실제 실행은 별도 확인합니다. 
