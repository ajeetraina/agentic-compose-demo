export async function POST(request) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username || typeof username !== "string") {
      return Response.json(
        { success: false, error: "Username is required" },
        { status: 400 }
      );
    }

    console.log(`Analyzing GitHub user: ${username}`);

    // Get the agents service URL from environment
    const agentsUrl = process.env.AGENTS_URL || "http://agents:7777";

    // Call the agents service
    const response = await fetch(`${agentsUrl}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        agent: "hackathon_recommender"
      }),
    });

    if (!response.ok) {
      throw new Error(`Agents service error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      return Response.json({
        success: false,
        error: result.error || "Analysis failed",
      });
    }

    return Response.json({
      success: true,
      recommendations: result.recommendations,
      profile: result.profile,
    });

  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      {
        success: false,
        error: "Internal server error. Please check the logs for details.",
      },
      { status: 500 }
    );
  }
}
