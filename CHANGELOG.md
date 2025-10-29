# Changelog

모든 주요 변경 사항은 이 파일에 문서화됩니다.

## [2.0.0] - 2025-10-29

### 🔥 주요 변경사항

- **데이터베이스 제거**: Prisma와 SQLite를 제거하고 JSON 파일 기반 저장소로 전환
- **간소화된 설정**: 더 이상 데이터베이스 마이그레이션이 필요하지 않음
- **순수 의존성**: `@prisma/client`와 `prisma` 패키지 제거

### ✨ 새로운 기능

- JSON 파일 기반 데이터 저장소 (`data/` 폴더)
- 자동 데이터 파일 생성
- 실시간 파일 저장

### 🗑️ 제거된 기능

- Prisma ORM
- SQLite 데이터베이스
- 데이터베이스 마이그레이션 스크립트
- `npm run db:*` 명령어들

### 📦 데이터 저장

#### 파일 구조

- `data/guilds.json` - 서버 설정
- `data/reaction-roles.json` - 반응 역할
- `data/moderation-logs.json` - 관리 로그

### 🛠️ 개발 도구

- `npm run dev` - 개발 모드
- `npm run build` - 프로덕션 빌드
- `npm start` - 프로덕션 실행

---

## [1.0.0] - 2025-10-29

### ✨ 추가된 기능

#### 환영 시스템

- `/welcome-setup` - 환영 메시지 및 자동 역할 설정
- `/leave-setup` - 퇴장 메시지 설정
- 신규 멤버 자동 역할 지급
- 커스터마이징 가능한 환영/퇴장 메시지
- 변수 지원: `{user}`, `{username}`, `{server}`, `{memberCount}`

#### 반응 역할 시스템

- `/reaction-role-add` - 메시지에 반응 역할 추가
- `/reaction-role-remove` - 반응 역할 제거
- `/reaction-role-list` - 반응 역할 목록 조회
- `/reaction-role-panel` - 반응 역할 패널 자동 생성
- 유니코드 & 커스텀 이모지 지원
- 자동 역할 지급/회수

#### 관리 기능

- `/purge` - 메시지 일괄 삭제 (1-100개)
- `/kick` - 멤버 추방
- `/ban` - 멤버 차단 (메시지 삭제 기간 설정 가능)
- 권한 계층 검증
- 관리 행동 자동 로깅

#### 기술적 기능

- JSON 파일 기반 데이터 저장소
- 한국어 Localization
- 영어 명령어 + 한국어 이름 지원
- TypeScript 기반
- Discord.js v14
- 자동 명령어 배포
- 임베드 메시지 지원

### 📦 데이터 구조

#### Guild 테이블

- 서버별 환영/퇴장 설정
- 자동 역할 설정

#### ReactionRole 테이블

- 반응 역할 매핑
- 메시지별 이모지-역할 연동

#### ModerationLog 테이블

- 모든 관리 행동 기록
- 시간순 정렬

###  문서

- 완전한 README
- GETTING_STARTED 가이드
- 한국어 문서
- 사용 예시
- 문제 해결 가이드
