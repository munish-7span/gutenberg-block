(function (blocks, element, components, blockEditor) {
	const { registerBlockType } = blocks;
	const { createElement: el, Fragment } = element;
	const { Button, PanelBody, TextControl, TextareaControl } = components;
	const {
		MediaUpload,
		useBlockProps,
		InspectorControls,
	} = blockEditor;

	registerBlockType('custom/mp-testimonial-block', {
		title: 'Testimonial',
		icon: 'businessperson',
		category: 'variation-child-category',
		supports: {
			align: ['left', 'center', 'right', 'wide', 'full'],
			multiple: false,
			color: {
				background: true,
				text: true,
				gradients: true,
				link: false,
				heading: true,
				enableContrastChecker: true,
			},
		},

		attributes: {
			testimonialItems: {
				type: 'array',
				default: [],
			}
		},

		edit: function (props) {
			const { attributes, setAttributes } = props;
			const { testimonialItems } = attributes;
			const blockProps = useBlockProps({
				className: 'mp-testimonial-block',
				style: {
					minHeight: '200px',
				}
			});

			function addTestimonialItem() {
				setAttributes({
					testimonialItems: [
						...testimonialItems,
						{
							profilePicture: '',
							profilePictureID: null,
							username: '',
							description: '',
							designation: '',
							profileURL: '',
						}
					]
				});
			}

			function updateTestimonialItem(index, field, value) {
				const newItems = [...testimonialItems];
				newItems[index][field] = value;
				setAttributes({ testimonialItems: newItems });
			}

			function removeTestimonialItem(index) {
				const newItems = testimonialItems.filter((_, i) => i !== index);
				setAttributes({ testimonialItems: newItems });
			}

			return el(Fragment, null, [
				el('div', { ...blockProps }, [
					testimonialItems.map((item, index) =>
						el('div',
							{
								className: `testimonial_${index + 1}`,
								key: index
							},
							[
								el('div', { className: 'testimonial_wrapper' }, [
									el('div', { className: 'profile_picture' }, [
										item.profilePicture &&
										el('img', {
											src: item.profilePicture,
											alt: `Profile ${index + 1}`,
											style: { width: '100%', height: 'auto'}
										})
									]),
									el('div', { className: 'testimonial-content' }, [
										el('h4', null, item.username || 'Username'),
										el('p', null, item.description || 'Description goes here...'),
										el('span', null, item.designation || 'Designation')
									])
								])
							]
						)
					)
				]),
				el(InspectorControls, null,
					el(PanelBody, { title: 'Testimonials', initialOpen: true }, [
						testimonialItems.map((item, index) =>
							el(Fragment, { key: index }, [
								el('p', { style: { fontWeight: 'bold', marginBottom: '5px' } }, `Testimonial ${index + 1}`),
								el(MediaUpload, {
									onSelect: (media) => updateTestimonialItem(index, 'profilePicture', media.url),
									allowedTypes: ['image'],
									value: item.profilePictureID,
									render: ({ open }) => el(Fragment, null, [
										item.profilePicture &&
										el('img', {
											src: item.profilePicture,
											style: { width: '100%', marginBottom: '10px' },
										}),
										el(Button, {
											onClick: open,
											isSecondary: true,
											style: { margin: '10px 10px 10px 0' },
										}, item.profilePicture ? 'Change Image' : 'Select Image'),
										item.profilePicture &&
										el(Button, {
											onClick: () => updateTestimonialItem(index, 'profilePicture', ''),
											isDestructive: true,
											style: { marginTop: '10px' },
										}, 'Remove Image')
									])
								}),
                                el(TextControl, {
                                    label: 'Username',
                                    value: item.username,
                                    onChange: function (newUsername) {
                                        updateTestimonialItem(index, 'username', newUsername);
                                    },
                                    placeholder: 'Enter Username'
                                }),

                                el(TextareaControl, {
                                    label: 'Description',
                                    value: item.description,
                                    onChange: function (newContent) {
                                        updateTestimonialItem(index, 'description', newContent);
                                    },
                                    placeholder: 'Enter content...'
                                }),

                                el(TextControl, {
                                    label: 'Designation',
                                    value: item.designation,
                                    onChange: function (newDesignation) {
                                        updateTestimonialItem(index, 'designation', newDesignation);
                                    },
                                    placeholder: 'Enter Designation'
                                }),
                                el(Button, {
                                    onClick: () => removeTestimonialItem(index),
                                    isDestructive: true,
                                    className: 'remove-item'
                                }, 'Remove')

							])
						),
						el(Button, {
							isPrimary: true,
							onClick: addTestimonialItem,
							style: { marginTop: '10px' }
						}, 'Add Testimonial')
					])
				)
			]);
		},

		save: function (props) {
			const { attributes } = props;
			const { testimonialItems } = attributes;
			const blockProps = useBlockProps.save({
				className: 'mp-testimonial-block'
			});

			return el('div', blockProps,
				testimonialItems.map((item, index) =>
					index && el('div', { className: `testimonial_${index + 1}`, key: index },
						el('div', { className: 'testimonial_wrapper' }, [
							item.profilePicture &&
							item.profilePicture && el('div', { className: 'profile_picture' },
								el('img', { src: item.profilePicture, alt: `Profile ${index + 1}` })
							),
							el('div', { className: 'testimonial-content' }, [
								item.username && el('h4', null, item.username),
								item.description && el('p', null, item.description),
								item.description && el('span', null, item.designation)
							])
						])
					)
				)
			);
		}
	});
})(
	window.wp.blocks,
	window.wp.element,
	window.wp.components,
	window.wp.blockEditor
);
