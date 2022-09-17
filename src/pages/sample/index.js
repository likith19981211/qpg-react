import React from 'react';

const WelcomePage = React.lazy(() => import('./WelcomePage'));
const CollegeMasters = React.lazy(() => import('./Page1'));
const DepartmentMasters = React.lazy(() => import('./Page2'));
//const Department = React.lazy(() => import('./Department'));
const Course = React.lazy(() => import('./courseMasters'));
const CategoryMasters = React.lazy(() => import('./categoryMasters'));
const SubCategoryMasters = React.lazy(() => import('./subCategoryMasters'));
const SubjectMasters = React.lazy(() => import('./subjectMasters'));
const SubSubjectMasters = React.lazy(() => import('./subSubjectMasters'));
const TopicMasters = React.lazy(() => import('./topicMasters'));
const SubTopicMasters = React.lazy(() => import('./subTopicMasters'));
const QuestionTypeMasters = React.lazy(() => import('./questionTypeMasters'));
const DifficultyTypeMasters = React.lazy(() =>
  import('./difficultyTypeMasters'),
);
const QuestionMasters = React.lazy(() => import('./questionMasters'));
const QuestionBankMasters = React.lazy(() => import('./questionBankMasters'));
const QuestionBluePrintMasters = React.lazy(() =>
  import('./questionBluePrintMasters'),
);
const ExamMasters = React.lazy(() => import('./examMasters'));
const QuestionTypeCategory = React.lazy(() => import('./questionTypeCategoryMasters'));

export const samplePagesConfigs = [
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/college-masters',
    element: <CollegeMasters />,
  },
  {
    path: '/department-masters',
    element: <DepartmentMasters />,
  },
  // {
  //   path: '/department-masters',
  //   element: <Department />
  // },
  {
    path: '/course-masters',
    element: <Course />,
  },
  {
    path: '/category-masters',
    element: <CategoryMasters />,
  },
  {
    path: '/sub-category-masters',
    element: <SubCategoryMasters />,
  },
  {
    path: '/subject-masters',
    element: <SubjectMasters />,
  },

  {
    path: '/sub-subject-masters',
    element: <SubSubjectMasters />,
  },

  {
    path: '/topic-masters',
    element: <TopicMasters />,
  },

  {
    path: '/sub-topic-masters',
    element: <SubTopicMasters />,
  },
  {
    path: '/question-type-masters',
    element: <QuestionTypeMasters />,
  },
  {
    path: '/difficulty-type-masters',
    element: <DifficultyTypeMasters />,
  },
  {
    path: '/question-masters',
    element: <QuestionMasters />,
  },

  {
    path: '/question-bank-masters',
    element: <QuestionBankMasters />,
  },
  {
    path: '/question-blue-print-masters',
    element: <QuestionBluePrintMasters />,
  },
  {
    path: '/exam-masters',
    element: <ExamMasters />,
  },
  {
    path: '/question-type-category-masters',
    element: <QuestionTypeCategory />,
  },
];
