import { prisma } from "../lib/prisma";

async function GetCustomerSalesReturns() {
  try {
    const args = process.argv.slice(2);

    console.log("Arguments:", args);

    const command = args[0];
    const value = args[1];

    if (!command) {
      console.log("Please provide a command.");
      console.log("Example: npm run returns -- customer Vicar");
      return;
    }

    if (command === "customer") {
      if (!value) {
        console.log("Please provide a customer first name.");
        console.log("Example: npm run returns -- customer Vicar");
        return;
      }

      const customers = await prisma.customer.findMany({
        where: {
          firstName: {
            contains: value,
            mode: "insensitive",
          },
        },

        include: {
          sales: true,
        },
      });

      if (customers.length === 0) {
        console.log(`No customer found with the name "${value}".`);
        return;
      }

      console.dir(customers, { depth: null });
    } else {
      console.log(`Unknown command: ${command}`);
      console.log("Available command: customer");
    }
  } catch (error) {
    console.error("Error fetching customer sales:", error);
  } finally {
    await prisma.$disconnect();
  }
}

GetCustomerSalesReturns();