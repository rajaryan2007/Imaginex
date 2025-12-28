import { Button } from "../ui/button";

const { Sparkles } = require("lucide-react");


function AiFeatures(){
    return(
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-x1 p-6 mb-8 mt-12" >
            <h2 className="text-lg font-semibold mb-3 flex items-center justify-center" >
                <Sparkles className="h-5 w-5 text-purple-500 mr-2"/>
                AI Image Creation
            </h2>
            <p className="text-gray-700 mb-4 text-center" >Create stunning Thumbnail images for you Youtube videos with AI</p>
            <div className="flex flex-wrap gap-3 justify-center" >
                <Button
                varient='outline'
                className="rounded-full px-5 py-6 bg-linear-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-purple-700 border-purple-200 shadow-sm flex items-center"
                >
                Generate Thumbnail from video  title
                </Button>
                <Button
                varient='outline'
                className="rounded-full px-5 py-6 bg-linear-to-r from-blue-50 to-purple-50 hover:from-purple-100 hover:to-pink-100 text-pink-700 border-pink-200 shadow-sm flex items-center"
                >
                Generate custom Thumbnail image
                </Button>
            </div>
        </div>
    )    
}

export default AiFeatures;