const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const serviceData = [
    {
        title: 'Im providing Python Django Backend',
        description: 'Description for Im providing Python Django Backend',
        standard_offer: 100,
        premium_offer: 150,
        butter_offer: 200,
    },
    {
        title: 'Photo Manipulation',
        description: 'Description for Photo Manipulation',
        standard_offer: 120,
        premium_offer: 180,
        butter_offer: 220,
    },
];
const jobData = [
    {
        title: 'Admin Backend python-Django Fix ',
        description: 'Admin panel is not working properly, please fix it',
        budget: 500,
        deadline: new Date('2024-12-31'),
        is_payment_verified: true,
        is_job_completed: false,
    },
    {
        title: 'Game Design of Riding on a hill',
        description: 'Design a game of riding on a hill',
        budget: 700,
        deadline: new Date('2025-01-15'),
        is_payment_verified: false,
        is_job_completed: false,
    },
];
async function insertDummyData() {
    await prisma.service.createMany({
        data: serviceData,
    });
    await prisma.job.createMany({
        data: jobData,
    });
    console.log('Dummy data inserted successfully');
}
insertDummyData()
    .catch((error) => {
    console.error('Error inserting dummy data:', error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=dummyData.js.map