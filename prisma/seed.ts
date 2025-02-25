import { EmploymentType, PrismaClient, SectionType, UserRole, WorkMode } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.create({
    data: {
      name: "Test",
      email: "test@test.com", 
      emailVerified: new Date(),
      image: null,
      password: await bcrypt.hash("Test1234!", 10),
      initial: "TT",
      role: UserRole.USER,
      isTwoFactorEnabled: false
    },
  });

  // 첫 번째 이력서 생성
  const resume1 = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "Frontend Engineer",
      created_at: new Date(),
      updated_at: new Date(),
      header: {
        create: {
          fullName: "Elon Musk",
          location: "San Francisco, CA",
          phone: "+1 234-567-8901",
          email: "elon@tesla.com",
          links: [
            "https://github.com/kohdc1723",
            "https://linkedin.com/in/kohdc1723",
          ],
          isVisible: true,
        },
      },
    },
  });

  // Work Experience Section 생성
  const workSection = await prisma.section.create({
    data: {
      resumeId: resume1.id,
      type: SectionType.WORK_EXPERIENCE,
      column: 1,
      row: 1,
    },
  });

  // Work Experience Items 생성
  await prisma.workExperienceItem.create({
    data: {
      userId: user.id,
      sectionId: workSection.id,
      company: 'Tesla',
      location: 'Palo Alto, CA',
      order: 1,
      positions: {
        create: {
          title: "Frontend Engineer",
          workMode: WorkMode.HYBRID,
          employmentType: EmploymentType.PERMANENT_FULL_TIME,
          startDate: new Date("2022-03-01"),
          isCurrent: true,
          bullets: [
            'Developed and maintained React-based frontend applications',
            'Led migration from legacy codebase to modern React/TypeScript stack',
            'Improved application performance by 40% through code optimization',
          ],
        },
      },
    },
  });

  // Projects Section 생성
  const projectSection = await prisma.section.create({
    data: {
      resumeId: resume1.id,
      type: SectionType.PROJECTS,
      column: 1,
      row: 2,
    },
  });

  // Project Items 생성
  await prisma.projectItem.create({
    data: {
      userId: user.id,
      sectionId: projectSection.id,
      title: "Personal Portfolio Website",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-03-01"),
      order: 1,
      bullets: [
        "Developed a responsive portfolio website using Next.js and TypeScript",
        "Implemented modern UI/UX design using Tailwind CSS",
        "Set up continuous deployment pipeline using Vercel"
      ]
    }
  });

  // Skills Section 생성
  const skillSection = await prisma.section.create({
    data: {
      resumeId: resume1.id,
      type: SectionType.SKILLS,
      column: 1,
      row: 3,
    },
  });

  // Skill Items 생성
  await prisma.skillItem.create({
    data: {
      userId: user.id,
      sectionId: skillSection.id,
      category: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Java", "Python"],
      order: 1,
    },
  });

  // Education Section 생성
  const educationSection = await prisma.section.create({
    data: {
      resumeId: resume1.id,
      type: SectionType.EDUCATION,
      column: 1,
      row: 4,
    },
  });

  // Education Item 생성
  await prisma.educationItem.create({
    data: {
      userId: user.id,
      sectionId: educationSection.id,
      school: "University of Pennsylvania",
      location: "Philadelphia, PA",
      degree: "Bachelor of Science",
      field: "Computer Science",
      gpa: 3.8,
      startDate: new Date("2018-01-01"),
      endDate: new Date("2022-05-01"),
      order: 1,
      bullets: [
        "Dean's List 2018-2022",
        "Computer Science Student Association - Vice President",
        "Teaching Assistant for Data Structures & Algorithms course"
      ],
    },
  });

  // 레주메 2 생성
  await prisma.resume.create({
    data: {
      userId: user.id,
      title: "Backend Engineer",
      created_at: new Date(),
      updated_at: new Date(),
      header: {
        create: {
          fullName: "Elon Musk",
          location: "San Francisco, CA",
          phone: "+1 234-567-8901",
          email: "elon@tesla.com",
          links: [
            "https://github.com/kohdc1723",
            "https://linkedin.com/in/kohdc1723",
          ],
          isVisible: true,
        },
      },
      sections: {
        create: [
          {
            type: SectionType.WORK_EXPERIENCE,
            column: 1,
            row: 1,
            workExperienceItems: {
              create: {
                userId: user.id,
                company: 'SpaceX',
                location: 'Hawthorne, CA',
                order: 1,
                positions: {
                  create: {
                    title: "Backend Engineer",
                    workMode: WorkMode.HYBRID,
                    employmentType: EmploymentType.PERMANENT_FULL_TIME,
                    startDate: new Date("2021-06-01"),
                    isCurrent: true,
                    bullets: [
                      'Designed and implemented RESTful APIs using Node.js and Express',
                      'Optimized database queries resulting in 50% faster response times',
                      'Implemented microservices architecture using Docker and Kubernetes',
                    ],
                  },
                },
              },
            },
          },
          {
            type: SectionType.PROJECTS,
            column: 1,
            row: 2,
            projectItems: {
              create: [
                {
                  userId: user.id,
                  title: "E-commerce Backend Platform",
                  startDate: new Date("2023-01-01"),
                  endDate: new Date("2023-04-01"),
                  order: 1,
                  bullets: [
                    "Developed scalable backend architecture using Node.js and MongoDB",
                    "Implemented payment processing system using Stripe API",
                    "Built caching layer with Redis reducing database load by 60%"
                  ]
                },
                {
                  userId: user.id,
                  title: "Microservices Migration Project",
                  startDate: new Date("2023-05-01"),
                  endDate: new Date("2023-08-01"),
                  order: 2,
                  bullets: [
                    "Decomposed monolithic application into microservices using Node.js",
                    "Implemented service discovery and load balancing using Kubernetes",
                    "Set up monitoring and logging using ELK stack"
                  ]
                }
              ]
            }
          },
          {
            type: SectionType.SKILLS,
            column: 1,
            row: 3,
            skillItems: {
              create: [
                {
                  userId: user.id,
                  category: "Programming Languages",
                  skills: ["JavaScript", "TypeScript", "Python", "Go"],
                  order: 1
                },
                {
                  userId: user.id,
                  category: "Backend Technologies",
                  skills: ["Node.js", "Express", "Django", "FastAPI"],
                  order: 2
                },
                {
                  userId: user.id,
                  category: "DevOps & Cloud",
                  skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
                  order: 3
                }
              ]
            }
          },
          {
            type: SectionType.EDUCATION,
            column: 1,
            row: 4,
            educationItems: {
              create: {
                userId: user.id,
                school: "University of Pennsylvania",
                location: "Philadelphia, PA",
                degree: "Bachelor of Science",
                field: "Computer Science",
                gpa: 3.8,
                startDate: new Date("2018-01-01"),
                endDate: new Date("2022-05-01"),
                order: 1,
                bullets: [
                  "Dean's List 2018-2022",
                  "Backend Development Club - President",
                  "Research Assistant in Distributed Systems Lab"
                ]
              }
            }
          }
        ]
      }
    }
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });