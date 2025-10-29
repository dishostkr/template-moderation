# JSON 기반으로 전환 완료

이 프로젝트는 더 이상 Prisma와 데이터베이스를 사용하지 않습니다.
대신 `data/` 폴더에 JSON 파일로 데이터를 저장합니다.

## 삭제 가능한 파일/폴더

다음 파일과 폴더는 더 이상 필요하지 않으므로 삭제할 수 있습니다:

- `prisma/` 폴더 전체
- `prisma.config.ts`
- `scripts/ensure-db.js`
- `dev.db` (SQLite 데이터베이스 파일, 있는 경우)

삭제 명령어:
```bash
rm -rf prisma/ prisma.config.ts scripts/ensure-db.js dev.db
```

## 데이터 저장 위치

모든 데이터는 이제 `data/` 폴더에 JSON 파일로 저장됩니다:
- `data/guilds.json` - 서버 설정
- `data/reaction-roles.json` - 반응 역할
- `data/moderation-logs.json` - 관리 로그

이 폴더는 봇이 처음 실행될 때 자동으로 생성됩니다.
