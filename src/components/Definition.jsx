import { useEffect, useState } from "react";
import { hasWordInCache, storeInCache } from "../utils/manageCache";
import Spinner from "./ui/Spinner";

const Definition = ({ selected }) => {
  const [definition, setDefinition] = useState({
    loading: false,
    def: "",
  });

  useEffect(() => {
    const fetchDefinition = async () => {
      setDefinition((prev) => ({
        ...prev,
        loading: true,
      }));

      const hasCache = hasWordInCache(selected);

      if (hasCache) {
        setDefinition({
          loading: false,
          def: hasCache,
        });

        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/definition/${selected}`
        );
        const data = await response.json();

        setDefinition({
          loading: false,
          def: data?.definition,
        });
        storeInCache(selected, data.definition);
      } catch (error) {
        console.log(error);
      } finally {
        setDefinition((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    };
    fetchDefinition();
  }, [selected]);

  if (definition.loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Spinner />
        <span>Fetching definition...</span>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-sm leading-relaxed text-gray-700">
        {definition.def}
      </div>
    </div>
  );
};
export default Definition;
