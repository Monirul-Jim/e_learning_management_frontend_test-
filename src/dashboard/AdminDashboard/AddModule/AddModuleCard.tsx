interface CategoryDetail {
  id: number;
  category: string;
  slug: string;
}

interface ParentModule {
  id: number;
  title: string;
}

interface CourseDetails {
  id: number;
  category_details: CategoryDetail[];
  description: string;
  image: string;
  price: number;
  title: string;
}

interface AddModuleCardProps {
  module: {
    id: number;
    course_details: CourseDetails;
    parent_module_details?: ParentModule;
    description: string;
    title: string;
  };
}

const AddModuleCard = ({ module }: AddModuleCardProps) => {
  return (
    <li
      key={module.id}
      className="mb-2 py-2 bg-blue-400 m-4 px-4 rounded-lg shadow-lg"
    >
      <h3 className="text-lg font-semibold">{module?.title}</h3>
      <p className="text-sm">
        Description: {module?.description || "No description available"}
      </p>
      <p className="text-sm">
        Course: {module?.course_details?.title || "No course associated"}
      </p>
      {module.parent_module_details && (
        <p className="text-sm">
          Parent Module: {module?.parent_module_details?.title}
        </p>
      )}
    </li>
  );
};

export default AddModuleCard;
