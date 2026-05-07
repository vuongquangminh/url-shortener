-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "original_url" TEXT NOT NULL,
    "short_code" TEXT NOT NULL,
    "click_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "url_clicks" (
    "id" SERIAL NOT NULL,
    "url_id" INTEGER NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "referer" TEXT,
    "clicked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "url_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_original_url_key" ON "urls"("original_url");

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_code_key" ON "urls"("short_code");

-- CreateIndex
CREATE INDEX "urls_created_at_idx" ON "urls"("created_at");

-- CreateIndex
CREATE INDEX "url_clicks_url_id_idx" ON "url_clicks"("url_id");

-- CreateIndex
CREATE INDEX "url_clicks_clicked_at_idx" ON "url_clicks"("clicked_at");

-- AddForeignKey
ALTER TABLE "url_clicks" ADD CONSTRAINT "url_clicks_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
