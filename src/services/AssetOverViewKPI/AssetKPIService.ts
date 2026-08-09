import { prisma } from "../../lib/prisma";

export const AssetKPIService = {
  
    GetAssetKPIs: async () => {
   
        const [
      totalAssets,
      activeAssets,
      underRepair,
      totalAssetValue,

      homeAssets,
      ShopAssets,

    //   Asset by Cost
    ActiveCost,
    UnderRepairCost,
    DamagedCost,
    LostCost,
    DisposedCost


    ] =
     await
      Promise.all([
      prisma.assets.count(),

      prisma.assets.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.assets.count({
        where: {
          status: "UNDER_REPAIR",
        },
      }),

      prisma.assets.aggregate({
        _sum: {
          purchaseCost: true,
        },
      }),


prisma.assets.count({
    where:{
        location:"HOUSE"
    }
}),


prisma.assets.count({
    where:{
        location:"SHOP"
    }
}),

// Cost by Status .........
prisma.assets.aggregate({
    where:{
        status:"ACTIVE"
        
    },
_sum:{
    purchaseCost:true
}    
}),

prisma.assets.aggregate({
    where:{
        status:"UNDER_REPAIR"
        
    },
_sum:{
    purchaseCost:true
}    
}),

prisma.assets.aggregate({
    where:{
        status:"DAMAGED"
        
    },
_sum:{
    purchaseCost:true
}    
}),

prisma.assets.aggregate({
    where:{
        status:"LOST"
        
    },
_sum:{
    purchaseCost:true
}    
}),

prisma.assets.aggregate({
    where:{
        status:"DISPOSED"
        
    },
_sum:{
    purchaseCost:true
}    
})






    ]);




    return {
      totalAssets,
      activeAssets,
      underRepair,
      totalAssetValue: totalAssetValue._sum.purchaseCost ?? 0,
      homeAssets,
      ShopAssets,

    //   Asset cost by status
    ActiveCost:ActiveCost._sum.purchaseCost,
    UnderRepairCost:UnderRepairCost._sum.purchaseCost,
    DamagedCost:DamagedCost._sum.purchaseCost,
    LostCost:LostCost._sum.purchaseCost,
    DisposedCost:DisposedCost._sum.purchaseCost
    };
  },
};