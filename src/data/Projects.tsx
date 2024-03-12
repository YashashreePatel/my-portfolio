import { IProject } from '@/types/IProject';

export const Projects: IProject[] = [
  {
    name: 'Social Media Dashboard',
    completion_date: 'August 2023',
    description: 'Developed a comprehensive analytics tool integrating APIs from Twitter, Facebook, and Instagram to track real-time social media metrics, enhancing user engagement and insight. Utilized authentication, Chart.js for data visualization, and automated content scheduling, providing users with advanced control over their online presence.',
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
    project_link: 'https://github.com/YashashreePatel/ConnectSocial'
  },
  {
    name: 'Stresser Website',
    completion_date: 'April 2022',
    description: 'Crafted an interactive website leveraging React, Redux, and Django, offering an 80% accurate personality prediction tool, alongside features for detecting Depression, Anxiety, and Stress (DAS) and facilitating specialist appointments. This platform provides a seamless user experience for personality assessment and mental health support.',
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
    project_link: 'https://github.com/YashashreePatel/Stresser-Website'
  },
]