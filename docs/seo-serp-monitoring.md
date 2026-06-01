# Мониторинг позиций в Яндексе

Скрипт: `web/scripts/yandex-serp-monitor.mjs`  
Список запросов: `web/data/seo/queries.txt`  
Отчеты: `web/data/seo/reports/YYYY-MM-DD.csv`

## Переменные окружения

Добавьте в `web/.env`:

```env
YANDEX_SEARCH_API_KEY=...
YANDEX_FOLDER_ID=b1guf9u70l3gtniogn5e
SERP_TARGET_DOMAIN=stroytrest-23.ru
```

## Ручной запуск

```powershell
cd web
npm run seo:monitor
```

## Ежедневный запуск в Windows Task Scheduler

Пример команды действия:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -Command "cd C:\Users\konst\Проекты\site_stroy_kuban\web; npm run seo:monitor"
```

Рекомендуемая частота: 1 раз в сутки, например в 08:30.
