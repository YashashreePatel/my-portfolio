import { IProject } from '@/types/IProject';

export const Projects: IProject[] = [
  {
    name: 'Social Media Dashboard',
    completion_date: 'August 2023',
    description: 'Designed a dynamic social media analytics platform, integrating real-time data from major networks with advanced data visualization, secure authentication, and scheduling features for enhanced online engagement management.',
    tech_stack: [
      'React',
      'HTML/CSS',
      'JavaScript',
      'Node',
      'Express',
      'Chart.js',
      'API',
      'Firebase'
    ],
    platform: 'Github', //available on which platform
    platform_icon: 'FaGithub',
    project_link: 'https://github.com/YashashreePatel/ConnectSocial',
    image: '/images/project/sample.jpeg',
  },
  {
    name: 'Stresser Website',
    completion_date: 'April 2022',
    description: 'Created a user-friendly website for accurate personality and mental health assessments, combining React, Redux, and Django for efficient prediction, stress detection, and easy access to professional support.',
    tech_stack: [
      'JavaScript',
      'React',
      'Redux',
      'Python',
      'MySQL',
      'Django',
      'Machine Learning'
    ],
    platform: 'Github',
    platform_icon: 'FaGithub',
    project_link: 'https://github.com/YashashreePatel/Stresser-Website',
    image: '/images/project/sample.jpeg',
  },
]