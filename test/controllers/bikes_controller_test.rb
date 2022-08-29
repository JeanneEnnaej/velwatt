require "test_helper"

class BikesControllerTest < ActionDispatch::IntegrationTest
  test "should get game" do
    get bikes_game_url
    assert_response :success
  end
end
