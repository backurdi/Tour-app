const Tour = require('../models/tourModel');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res) => {
    //1) Get tour data from collection
    const tours = await Tour.find();

    //2) Build template


    //3) Render that template with data from collection

    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findOne({
        slug: req.params.slugs
    }).populate({
        path: 'reviews',
        fields: 'review, rating, user'
    })

    if (!tour) return next(new AppError('There is no tour with that name', 404))
    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour
    });
});

exports.getLoginForm = catchAsync(async (req, res) => {
    res.status(200).render('login', {
        title: 'Log in to your account'
    });
});

exports.getSignupForm = catchAsync(async (req, res) => {
    res.status(200).render('signup', {
        title: 'Log in to your account'
    });
});

exports.getAccount = catchAsync(async (req, res) => {
    res.status(200).render('account', {
        title: 'Your account'
    });
});