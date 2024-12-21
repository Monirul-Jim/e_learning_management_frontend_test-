// import { useEffect, useState } from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { toast } from "react-toastify";
// import {
//   useAddQuizMutation,
//   useDeleteQuizMutation,
//   useGetModulesQuery,
//   useGetQuizAdminQuery,
//   useUpdateQuizMutation,
// } from "../../../redux/api/courseApi";

// type QuizFormData = {
//   title: string;
//   options: { text: string }[];
//   correctAnswer: string;
//   module: string;
// };

// interface ModuleDetail {
//   id: number;
//   title: string;
// }
// interface ParentModuleDetail {
//   id: number;
//   title: string;
// }

// interface ModuleDetail {
//   id: number;
//   title: string;
//   description: string;
//   parent_module_details?: ParentModuleDetail;
// }
// const AddQuiz = () => {
//   const { control, register, handleSubmit, setValue, watch, reset } =
//     useForm<QuizFormData>({
//       defaultValues: {
//         title: "",
//         options: [{ text: "" }],
//         correctAnswer: "",
//       },
//     });
//   const { data: moduleData, isLoading: moduleLoading } =
//     useGetModulesQuery(null);
//   const { data: qData, isLoading: qLoading } = useGetQuizAdminQuery(null);
//   const [addQuiz, { isLoading: quizLoading }] = useAddQuizMutation();
//   const [updateQuiz, { isLoading: uLoading, error }] = useUpdateQuizMutation();
//   console.log(error);

//   const [deleteQuiz, { isLoading: dLoading }] = useDeleteQuizMutation();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "options",
//   });

//   const [selectedQuiz, setSelectedQuiz] = useState<any | null>(null);

//   useEffect(() => {
//     if (selectedQuiz) {
//       setValue("title", selectedQuiz.title);
//       setValue("correctAnswer", selectedQuiz.questions.correctAnswer);
//       setValue("options", selectedQuiz.questions.options);
//     } else {
//       reset(); // Reset the form if no quiz is selected
//     }
//   }, [selectedQuiz, setValue, reset]);

//   const onSubmit = async (data: QuizFormData) => {
//     if (!data.correctAnswer || !data.title) {
//       toast.error("Please fill all the required fields!");
//       return;
//     }

//     const selectedModule = moduleData?.data?.find(
//       (module: ModuleDetail) => module.id === Number(data.module)
//     );

//     const payload = {
//       module: selectedModule.id,
//       title: data.title,
//       questions: {
//         options: data.options,
//         correctAnswer: data.correctAnswer,
//       },
//     };
//     try {
//       if (selectedQuiz) {
//         await updateQuiz({ id: selectedQuiz.id, payload });
//         toast.success("Quiz updated successfully!");
//       } else {
//         await addQuiz(payload);
//         toast.success("Quiz added successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating quiz:", error);
//       toast.error("Error updating quiz!");
//     }
//   };

//   const handleUpdate = (quiz: any) => {
//     setSelectedQuiz(quiz); // Pre-fill form with quiz data
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteQuiz(id); // Delete quiz by ID
//       toast.success("Quiz deleted successfully!");
//     } catch (error) {
//       toast.error("Error deleting quiz!");
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="mx-auto p-8 border rounded shadow"
//       >
//         <h2 className="text-2xl font-semibold mb-4">
//           {selectedQuiz ? "Update Quiz" : "Add Quiz Question"}
//         </h2>

//         {/* module field */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             Select Module
//           </label>
//           <select
//             {...register("module", { required: true })}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             <option value="">Select a module...</option>
//             {!moduleLoading &&
//               moduleData?.data?.map((module: ModuleDetail) => (
//                 <option key={module.id} value={module.id}>
//                   {module.title}
//                 </option>
//               ))}
//           </select>
//         </div>

//         {/* Question Field */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             Question
//           </label>
//           <input
//             type="text"
//             {...register("title", { required: true })}
//             placeholder="Enter your question here"
//             className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
//           />
//         </div>

//         {/* Options */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             Options
//           </label>
//           {fields.map((field, index) => (
//             <div key={field.id} className="flex items-center mb-2">
//               <input
//                 type="text"
//                 {...register(`options.${index}.text`, { required: true })}
//                 placeholder={`Option ${String.fromCharCode(65 + index)}`}
//                 className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
//               />
//               {index > 0 && (
//                 <button
//                   type="button"
//                   onClick={() => remove(index)}
//                   className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => append({ text: "" })}
//             className="bg-green-500 text-white py-2 px-4 rounded-md"
//           >
//             Add Option
//           </button>
//         </div>

//         {/* Correct Answer */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             Correct Answer
//           </label>
//           <Controller
//             control={control}
//             name="correctAnswer"
//             render={({ field }) => (
//               <select
//                 {...field}
//                 className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
//               >
//                 <option value="" disabled>
//                   Select Correct Answer
//                 </option>
//                 {watch("options").map((option, index) => (
//                   <option key={index} value={String.fromCharCode(97 + index)}>
//                     {`Option ${String.fromCharCode(65 + index)}`}
//                   </option>
//                 ))}
//               </select>
//             )}
//           />
//         </div>

//         {/* Submit */}
//         <div>
//           <button
//             type="submit"
//             disabled={quizLoading || uLoading}
//             className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//           >
//             {quizLoading || uLoading
//               ? "Saving..."
//               : selectedQuiz
//               ? "Update Quiz"
//               : "Add Quiz"}
//           </button>
//         </div>
//       </form>

//       {/* Quiz List */}
//       <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Quiz Title</th>
//             <th className="border px-4 py-2">Options</th>
//             <th className="border px-4 py-2">Correct Answer</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {qData?.data?.map((quiz: any) => (
//             <tr key={quiz.id}>
//               <td className="border px-4 py-2">{quiz?.title}</td>
//               <td className="border px-4 py-2">
//                 <ul>
//                   {quiz?.questions?.options?.map(
//                     (option: any, index: number) => (
//                       <li key={index}>{option.text}</li>
//                     )
//                   )}
//                 </ul>
//               </td>
//               <td className="border px-4 py-2">
//                 {quiz?.questions?.correctAnswer}
//               </td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => handleUpdate(quiz)}
//                   className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => handleDelete(quiz.id)}
//                   className="bg-red-500 text-white py-2 px-4 rounded-md"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AddQuiz;

import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useGetModulesQuery,
  useGetQuizAdminQuery,
  useUpdateQuizMutation,
} from "../../../redux/api/courseApi";

type QuizFormData = {
  title: string;
  options: { text: string }[];
  correctAnswer: string;
  module: string;
};

interface ModuleDetail {
  id: number;
  title: string;
}

interface QuizData {
  id: number;
  title: string;
  module_title: string;
  questions: {
    options: { text: string }[];
    correctAnswer: string;
  };
}

const AddQuiz = () => {
  const { control, register, handleSubmit, setValue, watch, reset } =
    useForm<QuizFormData>({
      defaultValues: {
        title: "",
        options: [{ text: "" }],
        correctAnswer: "",
        module: "",
      },
    });

  const {
    data: moduleData,
    isLoading: moduleLoading,
    isError: moduleError,
  } = useGetModulesQuery(null);
  const {
    data: qData,
    isLoading: qLoading,
    isError: qError,
  } = useGetQuizAdminQuery(null);
  const [addQuiz, { isLoading: quizLoading }] = useAddQuizMutation();
  const [updateQuiz, { isLoading: uLoading }] = useUpdateQuizMutation();
  const [deleteQuiz, { isLoading: dLoading }] = useDeleteQuizMutation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

  useEffect(() => {
    if (selectedQuiz) {
      setValue("title", selectedQuiz.title);
      setValue("correctAnswer", selectedQuiz.questions.correctAnswer);
      setValue("options", selectedQuiz.questions.options);
    } else {
      reset(); // Reset the form if no quiz is selected
    }
  }, [selectedQuiz, setValue, reset]);

  const onSubmit = async (data: QuizFormData) => {
    if (!data.correctAnswer || !data.title) {
      toast.error("Please fill all the required fields!");
      return;
    }

    const selectedModule = moduleData?.data?.find(
      (module: ModuleDetail) => module.id === Number(data.module)
    );

    if (!selectedModule) {
      toast.error("Invalid module selected");
      return;
    }

    const payload = {
      module: selectedModule.id,
      title: data.title,
      questions: {
        options: data.options,
        correctAnswer: data.correctAnswer,
      },
    };

    try {
      if (selectedQuiz) {
        await updateQuiz({ id: selectedQuiz.id, payload });
        toast.success("Quiz updated successfully!");
        reset();
      } else {
        await addQuiz(payload);
        toast.success("Quiz added successfully!");
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      toast.error("Error updating quiz!");
    }
  };

  const handleUpdate = (quiz: QuizData) => {
    setSelectedQuiz(quiz); // Pre-fill form with quiz data
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteQuiz(id); // Delete quiz by ID
      toast.success("Quiz deleted successfully!");
    } catch (error) {
      toast.error("Error deleting quiz!");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-8 border rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">
          {selectedQuiz ? "Update Quiz" : "Add Quiz Question"}
        </h2>

        {/* module field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Select Module
          </label>
          {moduleLoading ? (
            <p>Loading modules...</p>
          ) : moduleError ? (
            <p>Error loading modules.</p>
          ) : (
            <select
              {...register("module", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a module...</option>
              {moduleData?.data?.map((module: ModuleDetail) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Question Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Question
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter your question here"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Options
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-2">
              <input
                type="text"
                {...register(`options.${index}.text`, { required: true })}
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ text: "" })}
            className="bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Add Option
          </button>
        </div>

        {/* Correct Answer */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Correct Answer
          </label>
          <Controller
            control={control}
            name="correctAnswer"
            render={({ field }) => (
              <select
                {...field}
                className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
              >
                <option value="" disabled>
                  Select Correct Answer
                </option>
                {watch("options").map((option, index) => (
                  <option key={index} value={String.fromCharCode(97 + index)}>
                    {`Option ${String.fromCharCode(65 + index)}`}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={quizLoading || uLoading}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {quizLoading || uLoading
              ? "Saving..."
              : selectedQuiz
              ? "Update Quiz"
              : "Add Quiz"}
          </button>
        </div>
      </form>

      {/* Quiz List */}
      <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
      {qLoading ? (
        <p>Loading quizzes...</p>
      ) : qError ? (
        <p>Error loading quizzes.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Quiz Title</th>
              <th className="border px-4 py-2">Module</th>
              <th className="border px-4 py-2">Options</th>
              <th className="border px-4 py-2">Correct Answer</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {qData?.data?.map((quiz: QuizData) => (
              <tr key={quiz.id}>
                <td className="border px-4 py-2">{quiz?.title}</td>
                <td className="border px-4 py-2">{quiz?.module_title}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {quiz?.questions?.options?.map((option, index) => (
                      <li key={index}>{option.text}</li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">
                  {quiz?.questions?.correctAnswer}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdate(quiz)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                    disabled={dLoading}
                  >
                    {dLoading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddQuiz;
