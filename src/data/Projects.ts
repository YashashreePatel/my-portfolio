import { IProject } from '@/types/IProject';

export const Projects: IProject[] = [
  {
    name: 'UserHub (Cloud WebApp)',
    completion_date: 'April 2024',
    description: 'I designed a web app with Node.js and Express.js, automating CI/CD processes on GCP with Terraform. This project helped reduce server response times by 50%, which was a big win!',
    tech_stack: ['JavaScript', 'Node.js', 'Express', 'MySQL', 'GCP', 'Packer', 'Terraform', 'CI/CD'],
    project_link: 'https://github.com/orgs/yashashreee/repositories',
    image: '/images/project/userhub.png',
    image_source: 'https://medium.com/@andersondario/deploying-packer-images-to-gcp-using-terraform-cloud-7ee84a9386d4',
  },
  {
    name: 'Social Media Dashboard',
    completion_date: 'August 2023',
    description: 'I created a MERN-based platform for managing social media in one place. We used JWT for secure access and integrated Chart.js for data visualization, plus automated content posting with Google Cloud Functions.',
    tech_stack: ['React', 'HTML/CSS', 'JavaScript', 'Node.js', 'Express', 'Chart.js', 'REST APIs', 'Firebase'],
    project_link: 'https://github.com/YashashreePatel/ConnectSocial',
    image: '/images/project/connectsocial.png',
    image_source: 'https://grizzlygrowler.org/9731/features/teenagers-using-social-media-as-a-primary-source-of-news/',
  },
  // {
  //   name: 'Stresser Website',
  //   completion_date: 'April 2022',
  //   description: 'In this project, I worked on personality prediction using K-means clustering on the DASS test, achieving over 80% accuracy. I also focused on enhancing our API performance with Django REST framework.',
  //   tech_stack: ['React', 'Python', 'JavaScript', 'Django', 'Redux', 'MySQL', 'Machine Learning Algorithms'],
  //   project_link: 'https://github.com/YashashreePatel/Stresser-Website',
  //   image: '/images/project/sample.jpeg',
  //   image_source: '',
  // },
  // {
  //   name: '',
  //   completion_date: '',
  //   description: '',
  //   tech_stack: [],
  //   project_link: '',
  //   image: '/images/project/sample.jpeg',
  //   image_source: '',
  // },
]