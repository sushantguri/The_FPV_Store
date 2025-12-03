const prisma = require('./prismaClient');

const products = [
    {
        name: 'SpeedyBee F405 V3 Stack',
        description: 'The best budget stack for FPV drones. Includes FC and 50A ESC. Bluetooth configuration supported.',
        price: 69.99,
        category: 'Electronics',
        imageUrl: 'https://oscarliang.com/ctt/uploads/2022/10/SpeedyBee-F405-V3-Stack-FC-ESC-1.jpg',
        stock: 50,
        rating: 4.8
    },
    {
        name: 'T-Motor Velox V3 2207 Motor',
        description: 'High performance motors for freestyle flying. 1750KV / 1950KV options available. Durable and smooth.',
        price: 18.99,
        category: 'Motors',
        imageUrl: 'https://pyrodrone.com/cdn/shop/products/T-Motor-Velox-V3-2207-1750KV-1950KV-Motor-1_1024x1024.jpg',
        stock: 100,
        rating: 4.9
    },
    {
        name: 'TBS Source One V5 Frame',
        description: 'The standard for open source freestyle frames. Durable carbon fiber and affordable price point.',
        price: 29.95,
        category: 'Frames',
        imageUrl: 'https://team-blacksheep.com/img/products/tbs_source_one_v5_1.jpg',
        stock: 30,
        rating: 4.7
    },
    {
        name: 'Foxeer T-Rex Micro Camera',
        description: '1500TVL low latency FPV camera for clear analog video. Excellent low light performance.',
        price: 32.90,
        category: 'Cameras',
        imageUrl: 'https://www.foxeer.com/images/goods/20201113/020c02c650892040058c65f956555139.jpg',
        stock: 25,
        rating: 4.6
    },
    {
        name: 'BetaFPV ELRS Nano Receiver',
        description: 'Long range, low latency control link. 2.4GHz ExpressLRS protocol. Tiny form factor.',
        price: 15.99,
        category: 'Electronics',
        imageUrl: 'https://betafpv.com/cdn/shop/products/ELRSNanoReceiver_2.4G_1_1000x.jpg',
        stock: 200,
        rating: 4.9
    },
    {
        name: 'DJI O3 Air Unit',
        description: 'The ultimate digital FPV system. 4K/60fps recording and low latency transmission.',
        price: 229.00,
        category: 'Electronics',
        imageUrl: 'https://dji-official-aps-southeast-1.aliyuncs.com/cms/uploads/000f274a004746279373972620703666.png',
        stock: 15,
        rating: 5.0
    },
    {
        name: 'HQProp Ethix S5 Props',
        description: 'Cinematic props designed by Steele. Smooth flight characteristics and durable polycarbonate.',
        price: 3.99,
        category: 'Props',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/HQProp-Ethix-S5-Light-Grey-Props-1_1024x1024.jpg',
        stock: 500,
        rating: 4.8
    },
    {
        name: 'CNHL Black Series 1300mAh 6S',
        description: 'High discharge 100C LiPo battery. Perfect for 5-inch freestyle builds.',
        price: 24.99,
        category: 'Batteries',
        imageUrl: 'https://cdn.shopify.com/s/files/1/2672/8290/products/CNHL-Black-Series-1300mAh-22.2V-6S-100C-Lipo-Battery-1_1024x1024.jpg',
        stock: 80,
        rating: 4.7
    },
    {
        name: 'Radiomaster Boxer Radio',
        description: 'Compact and powerful radio with built-in ELRS. Ergonomic design and Hall effect gimbals.',
        price: 139.99,
        category: 'Radios',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/Radiomaster-Boxer-Radio-ELRS-1_1024x1024.jpg',
        stock: 40,
        rating: 4.9
    },
    {
        name: 'Walksnail Avatar HD Goggles X',
        description: 'Digital FPV goggles with 1080p OLED screens. Supports Walksnail Avatar system.',
        price: 459.00,
        category: 'Goggles',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/files/Walksnail-Avatar-HD-Goggles-X-1.jpg',
        stock: 10,
        rating: 4.5
    },
    {
        name: 'ViFly Finder 2',
        description: 'Self-powered drone buzzer. Helps you find your quad even if the battery ejects.',
        price: 12.99,
        category: 'Electronics',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/Vifly-Finder-2-Drone-Buzzer-1_1024x1024.jpg',
        stock: 150,
        rating: 4.9
    },
    {
        name: 'Gemfan Hurricane 51466',
        description: 'Durable freestyle propellers. Great grip and control.',
        price: 3.50,
        category: 'Props',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/Gemfan-Hurricane-51466-V2-Durable-3-Blade-5-Prop-4-Pack-Midnight-Grey-1_1024x1024.jpg',
        stock: 300,
        rating: 4.8
    },
    {
        name: 'TBS Tango 2 Pro',
        description: 'Game-pad style radio with Crossfire built-in. Foldable antenna and compact design.',
        price: 199.95,
        category: 'Radios',
        imageUrl: 'https://team-blacksheep.com/img/products/tbs_tango2_pro_1.jpg',
        stock: 20,
        rating: 4.8
    },
    {
        name: 'GNB 1100mAh 6S 120C',
        description: 'Lightweight and high power LiHV battery. Great for racing or lightweight freestyle.',
        price: 28.99,
        category: 'Batteries',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/GNB-1100mAh-6S-120C-LiHV-Battery-XT60-1_1024x1024.jpg',
        stock: 60,
        rating: 4.6
    },
    {
        name: 'Rush Tank Solo VTX',
        description: 'High power analog video transmitter. Up to 1.6W output for extreme range.',
        price: 49.99,
        category: 'Electronics',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/Rush-Tank-Solo-5-8GHz-VTX-1_1024x1024.jpg',
        stock: 45,
        rating: 4.9
    }
];

const tutorials = [
    {
        title: 'How to Solder Like a Pro',
        content: 'Soldering is the most important skill in FPV. In this guide, we cover the basics of soldering, including temperature control, flux usage, and tinning wires. Always keep your tip clean and use high-quality 60/40 leaded solder for the best results.',
        videoUrl: 'https://www.youtube.com/embed/J5Sb21qbpEQ',
        author: 'FPV Master'
    },
    {
        title: 'Betaflight Setup Guide 4.3',
        content: 'Learn how to configure Betaflight 4.3 for the best flight performance. We walk through the Ports tab, Configuration, Receiver, and Modes. Make sure to backup your diff all before making changes.',
        videoUrl: 'https://www.youtube.com/embed/Ltot-1o5F1E',
        author: 'Tech Drone'
    },
    {
        title: 'ExpressLRS Binding Guide',
        content: 'Binding your ELRS receiver can be tricky. This tutorial explains the binding phrase method and the traditional bind button method. We also cover how to update your firmware via WiFi.',
        videoUrl: 'https://www.youtube.com/embed/8q7_aV8eLUE',
        author: 'Oscar Liang'
    }
    
];

async function main() {
    console.log('Start seeding ...');

    // Clean up existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.tutorial.deleteMany();
    console.log('Deleted existing data.');

    for (const product of products) {
        const p = await prisma.product.create({
            data: product,
        });
        console.log(`Created product with id: ${p.id}`);
    }

    for (const tutorial of tutorials) {
        const t = await prisma.tutorial.create({
            data: tutorial,
        });
        console.log(`Created tutorial with id: ${t.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
