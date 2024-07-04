-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_employeeNumber_fkey";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeeNumber_fkey" FOREIGN KEY ("employeeNumber") REFERENCES "Employee_number"("employeeNumber") ON DELETE CASCADE ON UPDATE CASCADE;
