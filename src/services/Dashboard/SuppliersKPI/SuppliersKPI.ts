import { prisma } from "../../../lib/prisma";
import { SupplierKPIDates } from "./SupplierDateUtilities";

export const SuppliersKPIServices = {
  async GetAllSuppliersKPI() {
    const [
      totalSuppliers,
      supplierStatus,
      totalPurchaseOrders,
      purchaseStatus,
      quantityOfPurchasedOrders,
      totalPurchaseCost,
      averagePurchaseAmount,

      // Newly Added Suppliers
      NewSuppliers,

      // Top Supplier
      TopSuppliers,
    ] = await Promise.all([
      // 1. Total suppliers
      prisma.supplier.count(),

      // 2. Supplier status
      prisma.supplier.groupBy({
        by: ["status"],
        _count: true,
      }),

      // 3. Total purchase orders
      prisma.purchase.count(),

      // 4. Purchase status
      prisma.purchase.groupBy({
        by: ["status"],
        _count: true,
      }),

      // 5. Total quantity purchased
      prisma.purchaseItem.aggregate({
        _sum: {
          quantity: true,
        },
      }),

      // 6. Total money spent on purchases
      prisma.$queryRaw<{ total: number | null }[]>`
        SELECT SUM(quantity * "costPrice") AS total
        FROM "PurchaseItem"
      `,

      // 7. Average purchase item cost
      prisma.purchaseItem.aggregate({
        _avg: {
          costPrice: true,
        },
      }),

      // 8. New suppliers this month
      prisma.supplier.count({
        where: {
          createdAt: {
            ...SupplierKPIDates.ThisMonth(),
          },
        },
      }),

      // 9. Top supplier by number of purchase orders
      prisma.purchase.groupBy({
        by: ["supplierId"],
        _count: {
          supplierId: true,
        },
        orderBy: {
          _count: {
            supplierId: "desc",
          },
        },
        take: 1,
      }),
    ]);

    // Get the actual supplier details
    const topSupplier = TopSuppliers[0]
      ? await prisma.supplier.findUnique({
          where: {
            id: TopSuppliers[0].supplierId,
          },
          select: {
            id: true,
            companyName: true,
            contactName: true,
            phone: true,
            email: true,
            address: true,
            status: true,
          },
        })
      : null;

    return {
      totalSuppliers,

      supplierStatus,

      totalPurchaseOrders,

      purchaseStatus,

      totalQuantityPurchased:
        quantityOfPurchasedOrders._sum.quantity ?? 0,

      totalPurchaseCost:
        totalPurchaseCost[0]?.total ?? 0,

      averagePurchaseAmount:
        averagePurchaseAmount._avg.costPrice ?? 0,

      NewSuppliers,

      TopSupplier: topSupplier
        ? {
            ...topSupplier,
            purchaseOrders:
              TopSuppliers[0]._count.supplierId,
          }
        : null,
    };
  },
};