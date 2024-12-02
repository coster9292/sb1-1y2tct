import { useState, useCallback, useEffect } from 'react';
import { fetchMakes } from '../../api/makes';
import {IMake} from '../../interfaces/IMake'



export function MakeFilter({make_id, onChangeMake}:any) {
    const [makes, setMakes] = useState<IMake[]>([]);

    useEffect(() => {
      requestMakes();
    }, []);


    const requestMakes = useCallback(async () => {
      const makes = await fetchMakes();
      setMakes(makes);
      console.log('makes::', makes);
    }, []);


  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Make
        </label>
        <select
          value={make_id || ''}
          onChange={(e) => onChangeMake(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Makes</option>
          {makes.map(make_obj => (
            <option key={make_obj.make_id} value={make_obj.make_id}>
              {make_obj.name}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}
