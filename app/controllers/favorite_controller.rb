class FavoriteController < ApplicationController
  before_action :set_favorite, only: [:show, :update, :destroy]

  def index
    render json: Favorite.all
  end
 
  def create
    roi = params[:roi]
    y = Favorite.create({roi: roi})
    u = User.find session[:user_id]
    u.favorites << y
    render json: y
  end
 
  def show
    user = User.find session[:user_id]
    userFavs = user.favorites
    render json: userFavs
  end
 
  def update
    render json: @favorite.update(favorite_params)
  end
 
  def destroy
    render json: @favorite.destroy
  end
 
  private
  def set_favorite
    @favorite = Favorite.find(params[:id])
  end
 
  def favorite_params
    params.require(:favorite).permit(:title, :author, :description, :isbn)
  end
end
