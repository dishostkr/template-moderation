# 🚀 빠른 시작 가이드

## 1단계: 프로젝트 클론 및 설치

```bash
git clone https://github.com/dishostkr/template-moderation.git
cd template-moderation
npm install
```

## 2단계: Discord 봇 생성

1. [Discord Developer Portal](https://discord.com/developers/applications) 접속
2. **"New Application"** 클릭
3. 봇 이름 입력 후 생성
4. 왼쪽 메뉴에서 **"Bot"** 선택
5. **"Reset Token"** 클릭하여 토큰 복사 (나중에 사용)
6. 아래로 스크롤하여 **Privileged Gateway Intents** 활성화:
   - ✅ Server Members Intent
   - ✅ Message Content Intent (선택사항)

## 3단계: 봇 권한 설정

1. 왼쪽 메뉴에서 **"OAuth2 → URL Generator"** 선택
2. **SCOPES** 섹션에서:
   - ✅ `bot`
   - ✅ `applications.commands`
3. **BOT PERMISSIONS** 섹션에서:
   - ✅ Manage Roles
   - ✅ Kick Members
   - ✅ Ban Members
   - ✅ Manage Messages
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Read Message History
   - ✅ Add Reactions
4. 하단에 생성된 URL 복사
5. 브라우저에 URL 붙여넣기하여 봇을 서버에 초대

## 4단계: 환경 변수 설정

1. `.env.example` 파일을 `.env`로 복사:

```bash
cp .env.example .env
```

2. `.env` 파일 수정:

```env
DISCORD_TOKEN=여기에_봇_토큰_붙여넣기
DISCORD_CLIENT_ID=여기에_클라이언트_ID_붙여넣기
DATABASE_URL="file:./dev.db"
```

**클라이언트 ID 찾기:**

- Discord Developer Portal → 왼쪽 메뉴 **"OAuth2 → General"**
- **CLIENT ID** 복사

## 5단계: 데이터베이스 초기화

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 6단계: 봇 실행

### 개발 모드 (추천)

```bash
npm run dev
```

### 프로덕션 모드

```bash
npm run build
npm start
```

## 7단계: 봇 테스트

Discord 서버에서:

1. `/ping` - 봇이 응답하는지 확인
2. `/welcome-setup` - 환영 시스템 설정
3. `/reaction-role-panel` - 반응 역할 패널 생성

## 🎉 완료!

봇이 정상적으로 작동하면 준비 완료입니다!

---

## 📚 다음 단계

- [명령어 목록 보기](README.md#-명령어-목록)
- [사용 예시 보기](README.md#-사용-예시)
- [개발 가이드 보기](README.md#-개발-가이드)

---

## ⚠️ 문제 해결

### 봇이 온라인 상태가 아니에요

- `.env` 파일의 `DISCORD_TOKEN`이 올바른지 확인
- Discord Developer Portal에서 토큰을 다시 생성해보세요

### 명령어가 나타나지 않아요

- 봇이 서버에 제대로 초대되었는지 확인
- `applications.commands` 스코프가 활성화되어 있는지 확인
- 봇을 재시작해보세요 (`Ctrl+C` 후 다시 `npm run dev`)

### 역할을 지급할 수 없어요

- 봇의 역할이 지급하려는 역할보다 위에 있는지 확인
- 봇에게 "Manage Roles" 권한이 있는지 확인

### 데이터베이스 오류

```bash
rm -rf prisma/migrations
rm dev.db
npx prisma migrate dev --name init
npx prisma generate
```

---

## 💬 지원

문제가 계속되면:

- [GitHub Issues](https://github.com/dishostkr/template-moderation/issues)
- [디스호스트 디스코드](https://dishost.kr/discord)
