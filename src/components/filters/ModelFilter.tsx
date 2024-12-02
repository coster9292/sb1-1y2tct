import { useState, useCallback, useEffect } from 'react';
import { fetchModels } from '../../api/models';
import { IModel } from '../../interfaces/IModel'



export function ModelFilter({make_id}:any) {
    const [models, setModels] = useState<IModel[]>([]);

    console.log('make_id::::', make_id);

    const requestModels = useCallback(async (make_id: any) => {
        if (make_id) {
          const models = await fetchModels(make_id);
          setModels(models);
          console.log('models::', models);
        } else {
          setModels([]);
        }
    }, [make_id]);

    useEffect(() => {
      requestModels(make_id);
    }, [make_id]);




  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Model
        </label>
        <select
          className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Models</option>
          {models.map((model) => (
            <option key={model.model_id} value={model.model_id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}
