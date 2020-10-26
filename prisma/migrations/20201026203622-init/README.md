# Migration `20201026203622-init`

This migration has been generated by Esteban Rojas at 10/26/2020, 2:36:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Todo" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"tenant" text   NOT NULL ,
"title" text   NOT NULL ,
"list" text   NOT NULL ,
"completed" boolean   NOT NULL DEFAULT false,
PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201026203622-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,20 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Todo {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  tenant    String
+  title     String
+  list      String
+  completed Boolean  @default(false)
+}
```

