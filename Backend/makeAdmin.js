const prisma = require('./prismaClient');

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.log('Please provide an email address.');
        console.log('Usage: node makeAdmin.js <email>');
        process.exit(1);
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: { role: 'admin' },
        });
        console.log(`Success! User ${updatedUser.email} is now an admin.`);
        console.log('Please log out and log back in to see the changes.');
    } catch (e) {
        console.error('Error updating user:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
