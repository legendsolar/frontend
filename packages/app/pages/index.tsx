import { Worm, WormProps, defaultChartDisplayParams} from '@project/components';
import { Component, generateFakeProductionData} from '@project/components';

export default function Index() {

    

  return (
    <div>
        <Worm
            rawData={generateFakeProductionData(7,3000)} 
            loading={false}
            error={false}
            styleOptions={defaultChartDisplayParams}
            max_W={3000}
            sx= {{}}
        ></Worm>
    </div>
  );
}
