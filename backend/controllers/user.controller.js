export const home = async (req,res) => {
    try {
        res.status(200).json({
            success: true,
            message: "hello from user controller"
        });
    } catch (error) {
        res.status(500).json({
            message: "Interval server error",
            success: false
        });
    }
}